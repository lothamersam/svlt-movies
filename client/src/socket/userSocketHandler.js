import {socket} from "./socket"

export const subscribeToUserJoin = (callback) => {
    socket.on('userJoined', (username) => {
        callback(username);
    });
};

export const subscribeToUserList = (callback) => {
    socket.on('userList', (data) => {
        callback(data);
    });
};

export const emitUserLogin = (username, image) => {
    socket.emit('userLogin', {username, image})
};