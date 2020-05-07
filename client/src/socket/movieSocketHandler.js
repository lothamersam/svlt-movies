import {socket} from "./socket"
import {throttle} from "lodash";

export const subscribeToNewMovie = (callback) => {
    socket.on('newMovie', data => callback(data))
};

export const subscribeToChange = (callback) => {
    socket.on('onChange', data => callback(data))
};

export const emitMovieJoin = (id) => {
    socket.emit('joinMovie', id)
};

export const emitChange = throttle((id, type, field, value) => {
    socket.emit('change', {
        id,
        type,
        field,
        value
    })
}, 1000);