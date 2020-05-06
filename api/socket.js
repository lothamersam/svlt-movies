const io = require('socket.io')();
const conn = io.of('/conn');

const users = {};

conn.on('connection', (socket) => {
    console.log(`CONN ${socket.id}: OPENED`);
    users[socket.id] = {};

    socket.on('userLogin', (data) => {
        console.log(`CONN ${socket.id}: SET USERNAME - ${data.username}, SET IMAGE - ${data.image}`);
        socket.emit('userList', users);

        users[socket.id] = {username: data.username, image: data.image, id: socket.id};
        socket.broadcast.emit('userJoined', {
            id: socket.id,
            username: data.username,
            image: data.image
        });
    });

    socket.on('disconnection', () => {
       console.log(`CONN ${socket.id}: LOST`)
    });
});

module.exports = {
    io,
    conn
};