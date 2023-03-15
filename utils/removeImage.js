const fs = require('fs');
const path = require('path');

const removeImage = (imgPath) => {
  const rootPath = path.join(__dirname, '..');

  fs.unlinkSync(rootPath + '\\' + imgPath);
};

module.exports = removeImage;
