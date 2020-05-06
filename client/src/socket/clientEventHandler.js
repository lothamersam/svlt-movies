import openSocket from "socket.io-client";

const io = openSocket();

export const test = (cb) => {
    io.on('test', () => cb('test'));
};