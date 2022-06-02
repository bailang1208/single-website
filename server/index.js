const dotenv = require('dotenv');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

dotenv.config();

const port = process.env.PORT | 3001;
const uploads = './uploads/';

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploads)
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });

app.get('/images', (req, res) => {
  const files = fs.readdirSync(uploads);
  res.status(200).json({
    files: files
  });
})

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(422).json({
      error: 'The uploaded file must be an image'
    });
  }

  return res.status(200).send(req.file)
});

app.get('/download/:file', (req, res) => {
  if(req.params.file) {
    return res.download(`${uploads}${req.params.file}`, req.params.file);
  }
  else {
    res.status(400).json({
      error: "Required file"
    })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});