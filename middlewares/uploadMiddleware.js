const multer = require('multer');

const path = require('path');


// Storage
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'public/uploads');
    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});


// File Upload
const upload = multer({
    storage
});

module.exports = upload;