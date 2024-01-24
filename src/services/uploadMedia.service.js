"use strict";

const multer = require('multer');

class uploadMediaService {
  uploadMedia() {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'src/public/storage/media')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const {originalname} = file;
            const filename = uniqueSuffix + '-' + originalname;
            cb(null, filename);
        }
    });

    return multer({ storage }).array('media', 10);
  }
}


module.exports = new uploadMediaService();