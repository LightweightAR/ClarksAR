import * as deepar from 'deepar';

// Log the version. Just in case.
console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function() {

  // Resize the canvas according to screen size.
  const canvas = document.getElementById('deepar-canvas');
  canvas.width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 0.66) : window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Initialize DeepAR.
  const deepAR = await deepar.initialize({
    licenseKey: '0015e421aadbae57d69cd3c8d2cfff38582e1fd91f6892882851c2013ecc115c6106708e60a7ed52',
    canvas: canvas,
    effect: 'effects/Clarks722', // The shoe-try-on effect file.
    additionalOptions: {
      // Use the front camera.
      cameraConfig: {
        facingMode: "environment",
      },
      hint: "footInit", // Add this hint to let DeepAR know we want to optimize for shoe-try-on use-case.
    }
  });

  // Hide the loading screen.
  document.getElementById("loader-wrapper").style.display = "none";

  // Register for a collback that lets you know when feet are detected.
  deepAR.callbacks.onFeetTracked = (leftFoot, rightFoot) => {
    const feetText = document.getElementById("feet-text");
    // Hide the text when the feet are first detected.
    if(leftFoot.detected || rightFoot.detected) {
      feetText.style.display = "none";
      deepAR.callbacks.onFeetTracked = undefined; // Unregister from the callback.
    }
  };

})();
