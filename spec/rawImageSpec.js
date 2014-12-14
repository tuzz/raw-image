"use strict";

var helpers = require("./specHelper");

describe("RawImage", function () {
  var subject;

  beforeEach(function () {
    subject = new RawImage("image.png");
    helpers.triggerLoad(subject);
  });

  it("has a 'width' property", function () {
    expect(subject.width).toEqual(2);
  });

  it("has a 'height' property", function () {
    expect(subject.height).toEqual(3);
  });

  describe("#get", function () {
    it("returns the color of a pixel", function () {
      expect(subject.get(1, 0)).toEqual({
        red:   1,
        green: 0,
        blue:  100,
        alpha: 255
      });
    });
  });

  describe("#set", function () {
    it("sets the color of a pixel", function () {
      subject.set(1, 1, helpers.white);

      expect(subject.get(1, 1)).toEqual({
        red:   255,
        green: 255,
        blue:  255,
        alpha: 255
      });
    });
  });

  describe("#render", function () {
    it("renders the image to a canvas", function () {
      var canvas = helpers.mockCanvas;
      var context = canvas.getContext("2d");
      var imageData = context.getImageData();

      subject.set(0, 0, helpers.white);
      subject.set(0, 1, helpers.red);
      subject.set(0, 2, helpers.green);
      subject.set(1, 0, helpers.blue);
      subject.set(1, 1, helpers.yellow);
      subject.set(1, 2, helpers.white);

      subject.render(canvas);

      expect(imageData.data).toEqual([
        255,255,255,255,   0,0,255,255,
        255,0,0,255,       255,255,0,255,
        0,255,0,255,       255,255,255,255
      ]);
    });
  });
});
