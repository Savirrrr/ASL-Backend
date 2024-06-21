// const express = require('express')
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const multer = require('multer');
// const path=require('path')

// const app=express()

// app.use(bodyParser.json());

// // let text;

// app.post('/action',async (req,res)=>{
//     try{
//         const {text}=req.body;
//         const pythonProcess = spawn('python', ['json_helper.py', text]);

//         let data = '';
//         pythonProcess.stdout.on('data', (chunk) => {
//             data += chunk.toString();
//         });

//         pythonProcess.stderr.on('data', (chunk) => {
//             console.error(`stderr: ${chunk}`);
//         });

//         pythonProcess.on('close', (code) => {
//             if (code !== 0) {
//             return res.status(500).send('Something went wrong');
//             }
           
//             res.send(data);
//         });
//     }
//     catch (e){
//         res.status(500).json({ error: "Error" });
//     }
// })

// app.post('/predict', async (req,res)=>{
//     try {
//         const vid=null;
//         const pythonProcess = spawn('python', ['predict.py', vid]);
            
//         let data = '';
//         pythonProcess.stdout.on('data', (chunk) => {
//                 data += chunk.toString();
//             });

//             pythonProcess.stderr.on('data', (chunk) => {
//                 console.error(`stderr: ${chunk}`);
//             });

//             pythonProcess.on('close', (code) => {
//                 if (code !== 0) {
//                 return res.status(500).send('Something went wrong');
//                 }

//             res.send(data);

//         });
//     } catch (e) {
//         res.status(500).json({error:"ERROR"});
//     }
// })

// app.listen(3000,()=>{
//     console.log("Server running on port 3000");
// })


// const express = require('express');
// const bodyParser = require('body-parser');
// const { spawn } = require('child_process');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// app.use(bodyParser.json());


// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 100000000 },
//   fileFilter: (req, file, cb) => {
//     checkFileType(file, cb);
//   }
// }).single('video');

// function checkFileType(file, cb) {

//   const filetypes = /mp4/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: MP4 Files Only!');
//   }
// }


// app.post('/action', async (req, res) => {
//   try {
//     const { text } = req.body;
//     const pythonProcess = spawn('python', ['json_helper.py', text]);

//     let data = '';
//     pythonProcess.stdout.on('data', (chunk) => {
//       data += chunk.toString();
//     });

//     pythonProcess.stderr.on('data', (chunk) => {
//       console.error(`stderr: ${chunk}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         return res.status(500).send('Something went wrong');
//       }
//       res.send(data);
//     });
//   } catch (e) {
//     res.status(500).json({ error: "Error" });
//   }
// });


// app.post('/predict', upload, async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded');
//     }

//     const vidPath = req.file.path;
//     const pythonProcess = spawn('python', ['predict.py', vidPath]);

//     let data = '';
//     pythonProcess.stdout.on('data', (chunk) => {
//       data += chunk.toString();
//     });

//     pythonProcess.stderr.on('data', (chunk) => {
//       console.error(`stderr: ${chunk}`);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         return res.status(500).send('Something went wrong');
//       }
//       res.send(data);
//     });
//   } catch (e) {
//     res.status(500).json({ error: "ERROR" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
  const filetypes = /mp4/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
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
    const data = await runPythonScript('predict.py', [vidPath]);
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});