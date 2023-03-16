const fs = require('fs');
const path = require('path');

const removeImage = (img) => {
  const rootPath = path.join(__dirname, '..');

  fs.unlinkSync(rootPath + '/public/uploads/' + img);
};

module.exports = removeImage;
