const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// socket.io connection and listeners
io.on('connection', function (socket) {
  console.log('a user connected');
  console.log(socket.id, '\n');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
