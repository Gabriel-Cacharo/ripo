const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  async uploadImageCloudinary(imageName) {
    try {
      const imageUploadedResponse = await cloudinary.uploader.upload(imageName, {
        resource_type: 'image',
        unique_filename: true,
        width: 400,
        height: 600,
      });

      return imageUploadedResponse;
    } catch (err) {
      throw new Error(err);
    }
  },

  async destroyImageCloudinary(publicId) {
    try {
      const destroyedImageResponse = await cloudinary.uploader.destroy(publicId);

      return destroyedImageResponse;
    } catch (err) {
      throw new Error(err);
    }
  },

  async editImageCloudinary(publicId, imageName) {
    try {
      const editedImageResponse = await cloudinary.uploader.upload(imageName, {
        public_id: publicId,
        resource_type: 'image',
        unique_filename: true,
        width: 400,
        height: 600,
      });

      return editedImageResponse;
    } catch (err) {
      throw new Error(err);
    }
  },
};
