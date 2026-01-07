const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('public'));

// Socket connect
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});


setInterval(() => {
  const temperatureData = {
    sensorId: 'sensor-01',
    temperature: (Math.random() * 15 + 15).toFixed(1), // 15–30°C
    unit: '°C',
    timestamp: new Date().toLocaleTimeString()
  };

  io.emit('temperatureUpdate', temperatureData);
}, 3000);

server.listen(3000, () => {
  console.log('sever:http://localhost:3000');
});
