const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Mindspring-images",
    format: async (req, file) => {
      if (file.mimetype === "image/jpeg") {
        return "jpg";
      }
      return "png";
    },
    public_id: (req, file) =>
      `Mindspring-img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "course-videos",
    format: async (req, file) => "mp4",
    public_id: (req, file) =>
      `Mindspring-course-video-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
  },
});

const imageParser = multer({ storage: imageStorage });
const videoParser = multer({ storage: videoStorage });

module.exports={imageParser,videoParser,cloudinaryInstance:cloudinary}