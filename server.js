const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const socketio = require('socket.io');
const http = require('http');
const router = express.Router();

const users = require("./routes/api/users");
const app = express();
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const server = http.createServer(app);
const io = socketio(server);

// Middleware
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Passport Midleware
app.use(passport.initialize());

// Passport Config
require("./Middleware/passport")
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/users", users);

//chat
app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Server running at ${port}`));
