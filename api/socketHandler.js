const io = require('socket.io')();
const conn = io.of('/conn');
const models = require('../database/models');

const users = {};
const movies = {};

conn.on('connection', (socket) => {
    console.log(`CONN ${socket.id}: OPENED`);

    socket.on('userLogin', (data) => {
        console.log(`CONN ${socket.id}: SET USERNAME - ${data.username}, SET IMAGE - ${data.image}`);
        users[socket.id] = {username: data.username, image: data.image, id: socket.id};

        socket.emit('userList', {users: users, id: socket.id});
        socket.broadcast.emit('userJoined', {
            id: socket.id,
            username: data.username,
            image: data.image
        });
    });

    socket.on('joinMovie', (data) => {
        // TODO notify users in old room if switching
        console.log(`CONN ${socket.id}: JOIN ${data}`);

        users[socket.id].room = data;
        socket.join(data)
    });

    socket.on('change', async (data) => {
        try {
            socket.to(users[socket.id].room).emit('onChange', data);
            const model = data.type === 0 ? models.Movie : models.Criteria;

            await model.update({[data.field]: data.value}, {
                where: {id: data.id}
            });
        } catch (e) {
            console.log(e)
        }
    });

    socket.on('focus', (data) => {
        socket.to(users[socket.id].room).emit('onFocus', data);
    });

    socket.on('disconnect', () => {
        console.log(`CONN ${socket.id}: LOST`);
        conn.emit('userLeave', {id: socket.id, ...users[socket.id]});
        delete users[socket.id];
    });
});

module.exports = {
    io,
    conn
};