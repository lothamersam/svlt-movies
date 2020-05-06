import {socket} from "./socket"

export const oof = () => {
    socket.on('onChange', (data) => console.log(data));
};
