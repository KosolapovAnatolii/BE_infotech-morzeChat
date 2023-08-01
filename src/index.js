require('dotenv').config();

const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.send('Hello!')
});

const server = app.listen(PORT);

const io = socketIO(server, {
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A new client connected.');

  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);

    io.emit('message', message);
  });

  socket.on('addUser', (user) => {
    console.log('Added user:', user);

    io.emit('user', user);
  });
});
