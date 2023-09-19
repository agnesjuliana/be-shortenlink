const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require('path');
const { handleError, buildResponse } = require('./bin/utilities/response');
const app = express();
app.use(cors());
const port = 9000;

//upload
let fileName = ''
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'storage'));
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        fileName = `file-${timestamp}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

// Validate the uploaded image
function isValidImage(file) {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.PNG', '.JPEG', '.JPG'];
    const maxSize = 2 * 1024 * 1024; //2MB
  
    // Check file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }
  
    // Check file size
    if (file.size > maxSize) {
      return false;
    }
  
    return true;
}

function isValidPDF(file) {
    const allowedExtensions = ['.pdf'];
    const maxSize = 25 * 1024 * 1024; // 20MB
  
    // Check file extension
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }
  
    // Check file size
    if (file.size > maxSize) {
      return false;
    }
  
    return true;
  }

const upload = multer({ storage }).single('file');

app.post('/api/v1/uploads', (req, res) => {
    upload(req, res, (err) => {
        if (!req.file) {
          // No file uploaded
          return res.status(400).json(buildResponse(null, false, "No file uploaded"));
        }
    
        // Perform file validation
        if (!isValidImage(req.file)) {
          // Invalid file type or size
          return res.status(400).json(buildResponse(null, false, "Invalid file"));
        }
    
        // File upload successful
        const response = {
            filename: fileName
        }
        return res.status(200).json(buildResponse(response, true, "File uploaded successfully"));
    });
  });

  app.post('/api/v1/uploads/pdf', (req, res) => {
    upload(req, res, (err) => {
        if (!req.file) {
          // No file uploaded
          return res.status(400).json(buildResponse(null, false, "No file uploaded"));
        }
    
        // Perform file validation
        if (!isValidPDF(req.file)) {
          // Invalid file type or size
          return res.status(400).json(buildResponse(null, false, "Invalid file"));
        }
    
        // File upload successful
        const response = {
            filename: fileName
        }
        return res.status(200).json(buildResponse(response, true, "File uploaded successfully"));
    });
  });


// routes
const userRoutes = require('./bin/app/user/user.route');

app.use(bodyParser.json());
app.use(`/api/v1/users`, userRoutes)
app.use('/api/v1/storage', express.static(path.join(__dirname, 'storage')));
app.use(handleError);

// healthcheck
app.get('/api/v1/healthcheck', (req, res) => {
    res.send('Health check server is running perfectly.');
});

// config db
const sequelize = require('./bin/DB/config/db-connection');
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

