// This file is used to generate bundle.js
// browserify examples/main.js > examples/bundle.js

var RawImage = require("../lib/rawImage");

var image = new RawImage("France.svg", {
  width: 750,
    height: 750
});

var black = { red: 0, green: 0, blue: 0, alpha: 255 };

image.onload = function () {
  for (var x = 0; x < image.width; x++) {
    for (var y = 0; y < image.height; y++) {
      if (y % 3 === 0) {
        image.set(x, y, black);
      }
    }
  }

  var canvas = document.getElementById("canvas");
  image.render(canvas);
};
