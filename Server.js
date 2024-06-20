const express = require('express')
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app=express()

app.use(bodyParser.json());

// let text;

app.post('/action',async (req,res)=>{
    try{
        const {text}=req.body;
        const pythonProcess = spawn('python', ['json_helper.py', text]);

        let data = '';
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        pythonProcess.stderr.on('data', (chunk) => {
            console.error(`stderr: ${chunk}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
            return res.status(500).send('Something went wrong');
            }
           
            res.send(data);
        });
    }
    catch (e){
        res.status(500).json({ error: "Error" });
    }
})

app.post('/predict', async (req,res)=>{
    try {
        const vid=null;
        const pythonProcess = spawn('python', ['predict.py', vid]);
            
        let data = '';
        pythonProcess.stdout.on('data', (chunk) => {
                data += chunk.toString();
            });

            pythonProcess.stderr.on('data', (chunk) => {
                console.error(`stderr: ${chunk}`);
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                return res.status(500).send('Something went wrong');
                }

            res.send(data);

        });
    } catch (e) {
        res.status(500).json({error:"ERROR"});
    }
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})