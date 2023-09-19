const multer = require('multer');
const path = require('path');

// Set the storage destination and filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'storage'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Create the multer upload instance
const upload = multer({ storage });

module.exports = upload;
