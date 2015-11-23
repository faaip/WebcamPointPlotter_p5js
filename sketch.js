var video;
var videoWidth, videoHeight;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(640, 480);
  videoWidth = video.width;
  videoHeight = video.height;
  document.title = random(1000, 9999) + "" + random(1000, 9999) + "" + random(1000, 9999) + "" + random(1000, 9999) + "";
}

function draw() {
  orbitControl();
  background(255);
  ambientLight(random(180, 255));
  translate(-video.width / 2, -video.height / 2, 0);
  var size = 12;
  var xT = size;
  var yT = size
  var videopixels = video.loadPixels().pixels;
  for (var y = 0; y < video.height; y += size) {
    for (var x = 0; x < video.width; x += size) {
      var i = y * video.width * 3 + x * 3;
      var r = videopixels[i]
      var g = videopixels[i + 1]
      var b = videopixels[i + 2]
      specularMaterial(r, g, b);
      var z = r + g;
      translate(xT, 0, z);
      sphere(map(mouseY, 0, height, 1, 15));
      translate(0, 0, -z);
    }
    translate(-x, yT, 0);
  }

  video.hide();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}