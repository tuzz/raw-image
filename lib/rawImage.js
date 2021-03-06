"use strict";

var RawImage = function (src, options) {
  var self = this;
  var scale;

  var initialize = function () {
    options = options || {};

    if (options.imageData) {
      self.width     = options.width;
      self.height    = options.height;
      self.imageData = getImageData();
    }
    else {
      var image = new Image();

      image.src = src;
      image.onload = function () {
        setDimensions(image);
        self.imageData = getImageData(image);

        self.onload();
      };
    }
  };

  this.onload = function () {};

  this.get = function (x, y) {
    if (inBounds(x, y)) {
      var i = index(x, y);

      return {
        "red":   self.imageData.data[i + 0],
        "green": self.imageData.data[i + 1],
        "blue":  self.imageData.data[i + 2],
        "alpha": self.imageData.data[i + 3]
      };
    }
  };

  this.set = function (x, y, color) {
    if (inBounds(x, y)) {
      var i = index(x, y);

      self.imageData.data[i + 0] = color.red;
      self.imageData.data[i + 1] = color.green;
      self.imageData.data[i + 2] = color.blue;
      self.imageData.data[i + 3] = color.alpha;
    }
  };

  this.render = function (canvas) {
    resize(canvas);

    var context = canvas.getContext("2d");
    context.putImageData(self.imageData, 0, 0);
  };

  this.toJson = function () {
    return JSON.stringify(self);
  };

  // private
  var getImageData = function(image) {
    var canvas = document.createElement("canvas");
    resize(canvas);

    var context = canvas.getContext("2d");

    if (image) {
      context.scale(scale, scale);
      context.drawImage(image, 0, 0);
      return context.getImageData(0, 0, self.width, self.height);
    }
    else {
      var imageData = context.getImageData(0, 0, self.width, self.height);
      for (var i = 0; i < imageData.data.length; i += 1) {
        imageData.data[i] = options.imageData.data[i];
      }
      return imageData;
    }
  };

  var inBounds = function (x, y) {
    return (x >= 0 && x < self.width) &&
           (y >= 0 && y < self.height);
  };

  var index = function (x, y) {
    return (x + y * self.width) * 4;
  };

  var resize = function (canvas) {
    canvas.setAttribute("width", self.width);
    canvas.setAttribute("height", self.height);
  };

  var setDimensions = function (image) {
    var targetWidth  = options.width  || image.width;
    var targetHeight = options.height || image.height;

    var xRatio = targetWidth  / image.width;
    var yRatio = targetHeight / image.height;

    scale = Math.min(xRatio, yRatio);

    self.width  = image.width  = Math.floor(image.width  * scale);
    self.height = image.height = Math.floor(image.height * scale);
  };

  initialize();
};

RawImage.fromJson = function (json) {
  var data = JSON.parse(json);
  return new RawImage(undefined, data);
};

module.exports = RawImage;
