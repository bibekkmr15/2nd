const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuring cloudinary API with credentials from .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Configuring multer middleware with cloudinary API and specifying folder name and file formats allowed to be uploaded
const storage = new CloudinaryStorage({
  // This above line creates a new instance of the CloudinaryStorage class from the multer-storage-cloudinary package. The CloudinaryStorage class is a custom multer storage engine that is used to upload assets to cloudinary.
  // The new keyword is used to create a new instance of the class. The CloudinaryStorage constructor takes an object as an argument which contains the configuration options for the storage engine.

  cloudinary: cloudinary,
  params: {
    folder: "YelpCamp", // Folder name where the uploaded files will be stored
    allowedFormats: ["png", "jpeg", "jpg"], // File formats allowed to be uploaded
  },
});

// Exporting cloudinary and storage objects
module.exports = {
  cloudinary,
  storage,
};
