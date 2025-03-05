const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const bonjour = require('bonjour')();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// File upload config
const upload = multer({ dest: 'uploads/' });

// Bonjour for LAN discovery
bonjour.publish({ name: 'LAN File Share', type: 'http', port: 3000 });

// Serve frontend
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    console.log(`File received: ${req.file.originalname}`);
    io.emit('file-uploaded', req.file.originalname);
    res.send('File uploaded successfully!');
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
