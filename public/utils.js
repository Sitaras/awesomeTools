const sharp = require("sharp");

const imageConverter = (imageData, extension, width = 350, height = 350) => {
  const imagesFormats = {
    svg: "svg",
    png: "png",
    jpeg: "jpeg",
    webp: "webp",
    tiff: "tiff",
  };

  const imageWidth = +width;
  const imageHeight = +height;

  switch (extension) {
    case imagesFormats.png:
      return sharp(imageData).resize(imageWidth, imageHeight).png().toBuffer();
    case imagesFormats.jpeg:
      return sharp(imageData).resize(imageWidth, imageHeight).jpeg().toBuffer();
    case imagesFormats.webp:
      return sharp(imageData).resize(imageWidth, imageHeight).webp().toBuffer();
    case imagesFormats.tiff:
      return sharp(imageData).resize(imageWidth, imageHeight).tiff().toBuffer();
    default:
      return Promise.resolve(imageData);
  }
};

module.exports = {
  imageConverter,
};
