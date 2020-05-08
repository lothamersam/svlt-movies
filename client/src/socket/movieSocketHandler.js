import {socket} from "./socket"
import {throttle} from "lodash";

export const subscribeToNewMovie = (callback) => {
    socket.on('newMovie', data => callback(data))
};

export const subscribeToChange = (callback) => {
    socket.on('onChange', data => callback(data))
};

export const subscribeToFocus = (callback) => {
    socket.on('onFocus', data => callback(data))
};

export const subscribeToNoNewCriteria = (callback) => {
    socket.on('newCriteria', data => callback(data));
};

export const emitMovieJoin = (id) => {
    socket.emit('joinMovie', id)
};

export const emitChange = throttle((id, type, field, value) => {
    socket.emit('change', {id, type, field, value})
}, 1000);

export const emitFocus = throttle((type, value, newValue, id) => {
    socket.emit('focus', {type, value, newValue, id})
}, 1000);
