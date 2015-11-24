var video;
var videoWidth, videoHeight;
var sizeSlider;
var backgroundSlider;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(1280, 1024);
  videoWidth = video.width;
  videoHeight = video.height;
  document.title = "PRESS SHIFT TO ACCESS CONTROLS"

  // GUI
  // create sliders
  sizeSlider = createSlider(1, 25, 12);
  sizeSlider.position(0, 0);
  sizeSlider.hide();
  backgroundSlider = createSlider(0, 255, 255);
  backgroundSlider.position(0, 20);
  backgroundSlider.hide();
  thresholdSlider = createSlider(0, 255 * 3, 0);
  thresholdSlider.position(0, 40);
  thresholdSlider.hide();
  depthSensitivtySlider = createSlider(0, 1000, 300);
  depthSensitivtySlider.position(0, 60);
  depthSensitivtySlider.hide();
  pixelationSlider = createSlider(3, 50, 12);
  pixelationSlider.position(0, 80);
  pixelationSlider.hide();

}

function draw() {
  rotateY(PI); // Flipping image
  if (!keyIsDown(SHIFT)) {
    // Orbitcontrol only works when GUI is hidden
    orbitControl();
    showGUI(false);
  } else {
    showGUI(true);
  }
  background(backgroundSlider.value());
  ambientLight(255);
  translate(-video.width / 2, -video.height / 2, 0);
  var size = pixelationSlider.value();
  var videopixels = video.loadPixels().pixels;
  for (var y = 0; y < video.height; y += size) {
    for (var x = 0; x < video.width; x += size) {
      var i = y * video.width * 3 + x * 3;
      var r = videopixels[i]
      var g = videopixels[i + 1]
      var b = videopixels[i + 2]

      specularMaterial(r, g, b); // Color boxes
      var z = -(r + g + b) * (depthSensitivtySlider.value() / 1000);
      translate(size, 0, z);
      if (r + g + b > thresholdSlider.value()) {
        box(sizeSlider.value());
      }
      translate(0, 0, -z); // New "line" of blocks
    }
    translate(-x, size, 0); // Making sure it's a rectangular box of boxes
  }
  video.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showGUI(b) {
  // Shows and hides sliders
  if (b) {
    sizeSlider.show();
    backgroundSlider.show();
    thresholdSlider.show();
    depthSensitivtySlider.show();
    pixelationSlider.show();
  } else {
    sizeSlider.hide();
    backgroundSlider.hide();
    thresholdSlider.hide();
    depthSensitivtySlider.hide();
    pixelationSlider.hide();
  }
}