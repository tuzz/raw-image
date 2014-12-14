"use strict";

var mockImageData = {
  // mock rgba data for a 2x3 image.
  data: [
    0,0,100,255,   1,0,100,255,
    0,1,100,255,   1,1,100,255,
    0,2,100,255,   1,2,100,255
  ]
};

var mockContext = {
  scale: function () {},
  drawImage: function () {},
  getImageData: function () { return mockImageData; },
  putImageData: function () {}
};

var mockCanvas = {
  setAttribute: function () {},
  getContext: function () { return mockContext; }
};

var mockDocument = {
  createElement: function () { return mockCanvas; }
};

var mockImage;
var MockImage = function () {
  var self = this;

  self.width = 2;
  self.height = 3;

  mockImage = self;
};

global.document = mockDocument;
global.Image    = MockImage;
global.RawImage = require("../lib/rawImage");

module.exports.triggerLoad = function () {
  mockImage.onload();
};

module.exports.mockCanvas = mockCanvas;

module.exports.white  = { "red": 255, "green": 255, "blue": 255, "alpha": 255 };
module.exports.red    = { "red": 255, "green": 0,   "blue": 0,   "alpha": 255 };
module.exports.green  = { "red": 0,   "green": 255, "blue": 0,   "alpha": 255 };
module.exports.blue   = { "red": 0,   "green": 0,   "blue": 255, "alpha": 255 };
module.exports.yellow = { "red": 255, "green": 255, "blue": 0,   "alpha": 255 };
