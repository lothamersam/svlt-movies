import {socket} from "./socket"

export const subscribeToUserJoin = (callback) => {
    socket.on('userJoined', (username) => {
        callback(username);
    });
};

export const userLogin = (username) => {
    socket.emit('userLogin', username)
};