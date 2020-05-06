const io = require('socket.io')();
const conn = io.of('/conn');

const users = {};

conn.on('connection', (socket) => {
    console.log(`CONN ${socket.id}: OPENED`);
    users[socket.id] = {};

    socket.on('userLogin', (username) => {
        console.log(`CONN ${socket.id}: SET USERNAME - ${username}`);
        users[socket.id] = {name: username};
        socket.broadcast.emit('userJoined', username);
    });

    socket.on('disconnection', () => {
       console.log(`CONN ${socket.id}: LOST`)
    });
});

module.exports = io;