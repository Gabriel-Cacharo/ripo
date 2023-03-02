const fs = require('fs');

module.exports = {
  async renderImageByBase64(imageBase64) {
    let base64String = imageBase64.split(';base64,').pop();
    let image = Buffer.from(base64String, 'base64');

    return fs.writeFileSync('image.png', image);
  },
};
