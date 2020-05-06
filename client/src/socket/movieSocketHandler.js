import {socket} from "./socket"
import axios from "axios";

export const subscribeToNewMovie = (callback) => {
    socket.on('newMovie', data => callback(data))
};

export const emitNewMovie = (name, image, user) => {
    axios.post('/api', {movie: {name, image}, user: user})
        .then(res => console.log('Added movie!', res))
        .catch(err => console.log('Failed adding movie!', err));
};