const io = require('socket.io')();
const conn = io.of('/conn');
const models = require('../database/models');

const users = {};
const movies = {};

conn.on('connection', (socket) => {
    console.log(`CONN ${socket.id}: OPENED`);

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

    socket.on('joinMovie', (data) => {
        console.log(`CONN ${socket.id}: JOIN ${data}`);

        users[socket.id].room = data;
        socket.join(data)
    });

    socket.on('change', async (data) => {
        try {
            if (data.type === 0) {
                socket.to(users[socket.id].room).emit('onChange', data);

                const [updated] = await models.Movie.update({[data.field]: data.value}, {
                    where: {id: data.id}
                });
            }
        } catch (e) {
            console.log(e);
        }
    });

    socket.on('disconnect', () => {
        console.log(`CONN ${socket.id}: LOST`);
        delete users[socket.id]
    });
});

module.exports = {
    io,
    conn
};