// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// app.use(bodyParser.json());

// // Ensure the upload directory exists
// const uploadDir = './uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: parseInt(process.env.FILE_SIZE_LIMIT) || 100000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// }).single('video');

// function checkFileType(file, cb) {
//     console.log('File originalname:', file.originalname);
//     console.log('File mimetype:', file.mimetype);
//     console.log('File extname:', path.extname(file.originalname).toLowerCase());
  
//     const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/quicktime']; // Adjust as needed
//     const extname = path.extname(file.originalname).toLowerCase();
//     const mimetype = file.mimetype;
  
//     if (allowedMimeTypes.includes(mimetype) && extname === '.mp4') {
//       return cb(null, true);
//     } else {
//       cb('Error: MP4 Files Only!');
//     }
//   }
  
  
  
// const runPythonScript = (script, args) => {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn('python', [script, ...args]);

//     let data = '';
//     pythonProcess.stdout.on('data', (chunk) => {
//       data += chunk.toString();
//     });

//     pythonProcess.stderr.on('data', (chunk) => {
//       console.error(`stderr: ${chunk}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         return reject(new Error('Something went wrong'));
//       }
//       resolve(data);
//     });
//   });
// };

// app.post('/action', async (req, res) => {
//   try {
//     const { text } = req.body;
//     const data = await runPythonScript('json_helper.py', [text]);
//     res.send(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/predict', upload, async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const vidPath = req.file.path;
//     const data = await runPythonScript('predict.py', [vidPath]);
//     res.send(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// // });
// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// app.use(bodyParser.json());

// // Ensure the upload directory exists
// const uploadDir = './uploads/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: uploadDir,
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: parseInt(process.env.FILE_SIZE_LIMIT) || 100000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// }).single('video');

// // function checkFileType(file, cb) {
// //   const allowedExtensions = ['.mp4', '.mpeg', '.mov'];
// //   const extname = path.extname(file.originalname).toLowerCase();

// //   // Check if the file extension is one of the allowed video formats
// //   if (allowedExtensions.includes(extname)) {
// //     return cb(null, true);
// //   } else {
// //     cb('Error: Video files with MP4, MPEG, or QuickTime formats only!');
// //   }
// // }
//     function checkFileType(file, cb) {
//         console.log('File originalname:', file.originalname);
//         console.log('File mimetype:', file.mimetype);
//         console.log('File extname:', path.extname(file.originalname).toLowerCase());
      
//         const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/quicktime']; // Adjust as needed
//         const extname = path.extname(file.originalname).toLowerCase();
//         const mimetype = file.mimetype;
      
//         if (allowedMimeTypes.includes(mimetype) && extname === '.mp4') {
//           return cb(null, true);
//         } else {
//           cb('Error: MP4 Files Only!');
//         }
//       }

// const runPythonScript = (script, args) => {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn('python', [script, ...args]);

//     let data = '';
//     pythonProcess.stdout.on('data', (chunk) => {
//       data += chunk.toString();
//     });

//     pythonProcess.stderr.on('data', (chunk) => {
//       console.error(`stderr: ${chunk}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         return reject(new Error('Something went wrong'));
//       }
//       resolve(data);
//     });
//   });
// };

// app.post('/action', async (req, res) => {
//   try {
//     const { text } = req.body;
//     const data = await runPythonScript('json_helper.py', [text]);
//     res.send(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/predict', upload, async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const vidPath = req.file.path;

//     // Assuming predict.py handles the conversion from uploaded format to desired formats
//     const data = await runPythonScript('predict.py', [vidPath]);
//     res.send(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
// const ffmpeg = require('fluent-ffmpeg');

// Set the path to the ffmpeg binary
ffmpeg.setFfmpegPath(ffmpegPath);

const app = express();

app.use(bodyParser.json());

// Ensure the upload directory exists
const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.FILE_SIZE_LIMIT) || 100000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('video');

function checkFileType(file, cb) {
  console.log('File originalname:', file.originalname);
  console.log('File mimetype:', file.mimetype);
  console.log('File extname:', path.extname(file.originalname).toLowerCase());

  const allowedMimeTypes = ['video/mp4', 'video/mpeg', 'video/quicktime'];
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (mimetype === 'application/octet-stream' || (allowedMimeTypes.includes(mimetype) && extname === '.mp4')) {
    return cb(null, true);
  } else {
    cb('Error: MP4 Files Only!');
  }
}

const runPythonScript = (script, args) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [script, ...args]);

    let data = '';
    pythonProcess.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });

    pythonProcess.stderr.on('data', (chunk) => {
      console.error(`stderr: ${chunk}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error('Something went wrong'));
      }
      resolve(data);
    });
  });
};

const convertToMp4 = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => {
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(err);
      })
      .run();
  });
};

app.post('/action', async (req, res) => {
  try {
    const { text } = req.body;
    const data = await runPythonScript('json_helper.py', [text]);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/predict', upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const vidPath = req.file.path;
    const convertedPath = `${uploadDir}${path.basename(vidPath, path.extname(vidPath))}.mp4`;

    await convertToMp4(vidPath, convertedPath);

    const data = await runPythonScript('predict.py', [convertedPath]);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
