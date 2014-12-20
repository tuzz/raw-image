// This file is used to generate bundle.js
// browserify examples/serialize/main.js > examples/serialize/bundle.js

var RawImage = require("../../lib/rawImage");

var image = new RawImage("France.svg", {
  width: 500,
  height: 400
});

image.onload = function () {
  var black = { red: 0, green: 0, blue: 0, alpha: 255 };

  for (var y = 0; y < 100; y++) {
    for (var x = 0; x < 100; x++) {
      image.set(x, y, black);
    }
  }

  var json = image.toJson();
  var clone = RawImage.fromJson(json);

  var canvas = document.getElementById("canvas");
  clone.render(canvas);
};
