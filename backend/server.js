const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
require('dotenv').config();
const cors = require('cors'); 

const app = express();
const port = 4000;

app.use(cors());


app.use(bodyParser.json());


app.post('/process', (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  const pythonProcess = spawn('python', ['main.py']);


  pythonProcess.stdin.write(JSON.stringify(data));
  pythonProcess.stdin.end();


  pythonProcess.stdout.on('data', (data) => {
    const result = JSON.parse(data);
    console.log('Received result from Python:', result);
    res.json(result);
  });


  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script stderr: ${data}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

 
  pythonProcess.on('close', (code) => {
    console.log(`Python script process exited with code ${code}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
