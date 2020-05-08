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

export const subscribeToUserLeave = (callback) => {
    socket.on('userLeave', (userId) => {
        callback(userId);
    });
};

export const subscribeToDisconnect = (callback) => {
  socket.on('disconnect', () => {
      socket.open();
      callback()
  })
};

export const emitUserLogin = (username, image) => {
    socket.emit('userLogin', {username, image})
};