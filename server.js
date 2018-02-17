const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Identicon = require('identicon.js');


// https://stackoverflow.com/questions/11625519/how-to-access-the-request-body-when-posting-using-node-js-and-express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4

let clients = {};
let avatars = {};

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/login', function (req, res) {
  const { username, id } = req.body;
  if (Object.values(clients).includes(username)) {
    // console.log(clients);
    // console.log('username in clients');
    res.send({ 'status': 500 });
  }
  else {
    // console.log('new user');
    // console.log('adding username to clients object');
    clients[id] = username;
    // console.log(clients);
    let avatar = crypto.createHash('md5').update(username).digest("hex");
    avatars[username] = new Identicon(avatar).toString();
    // console.log(avatars);
    // console.log('emitting clients count');
    // console.log(Object.keys(clients).length);
    io.emit('clients count', Object.keys(clients).length);
    res.send({ 'status': 200, username: username, avatars: avatars, clients: Object.keys(clients).length });
    io.emit('updating avatars', avatars);
  }
});

// socket.io connection and listeners
io.on('connection', function (socket) {
  // console.log('a user connected');
  // console.log(socket.id, '\n');
  
  socket.on('chat message', function (msg) {
    // console.log('chat message', msg);
    // console.log(msg);
    io.emit('chat message', msg);
  });

  socket.on('now typing', function (username) {
    // console.log('chat message', msg);
    // console.log(username, ' started typing');
    io.emit('now typing', username);
  });

  socket.on('stopped typing', function (username) {
    // console.log('chat message', msg);
    // console.log(username, ' stopped typing');
    io.emit('stopped typing', username);
  });

  socket.on('disconnect', function () {
    // console.log('user disconnected');
    // code below from https://socket.io/docs/server-api/
    io.clients((error, connectedClients) => {
      if (error) throw error;
      // console.log(connectedClients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD] currently connected clients
      let disconnectClient = Object.keys(clients).filter((client) => !connectedClients.includes(client))[0];
      let disconnectClientName = clients[disconnectClient];
      delete clients[disconnectClient];
      // console.log(Object.keys(clients).length);
      io.emit('clients count', Object.keys(clients).length);
      io.emit('client disconnected', disconnectClientName);
    });
  });
});

http.listen(process.env.PORT || 3000, function () {
  console.log('listening on *:3000');
});
