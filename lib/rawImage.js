var RawImage = function (src, options) {
  var self = this;
  var imageData;
  var scale;

  var initialize = function () {
    options = options || {};
    var image = new Image();

    image.src = src;
    image.onload = function () {
      setDimensions(image);
      imageData = getImageData(image);

      self.onload();
    };
  };
  initialize();

  this.onload = function () {};

  this.get = function (x, y) {
    if (inBounds(x, y)) {
      var i = index(x, y);

      return {
        "red":   imageData.data[i + 0],
        "green": imageData.data[i + 1],
        "blue":  imageData.data[i + 2],
        "alpha": imageData.data[i + 3]
      };
    }
  }

  this.set = function (x, y, color) {
    if (inBounds(x, y)) {
      var i = index(x, y);

      imageData.data[i + 0] = color.red;
      imageData.data[i + 1] = color.green;
      imageData.data[i + 2] = color.blue;
      imageData.data[i + 3] = color.alpha;
    }
  };

  this.render = function (canvas) {
    resize(canvas);

    var context = canvas.getContext('2d');
    context.putImageData(imageData, 0, 0);
  };

  // private
  var getImageData = function(image) {
    var canvas  = document.createElement("canvas");
    resize(canvas);

    var context = canvas.getContext('2d');
    context.scale(scale, scale);
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, self.width, self.height);
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

};
