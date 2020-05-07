import axios from "axios";
import {emitChange, emitMovieJoin} from "../socket/movieSocketHandler";

export const CHANGE = "CHANGE";
export const ON_CHANGE = "ON_CHANGE";
export const ON_FOCUS = "ON_FOCUS";
export const ON_ADD = "ON_ADD";
export const ON_DELETE = "ON_DELETE";

export const changeMovie = (field, value, received) => {
    return (dispatch, getState) => {
        const {movie} = getState();

        dispatch({
            type: CHANGE,
            field,
            value
        });

        if (!received) {
            emitChange(movie.selected.id, 0, field, value);
        }
    }
};

export const NEW_MOVIE = "NEW_MOVIE";
export const GET_MOVIES = "GET_MOVIES";
export const SELECT_MOVIE = "SELECT_MOVIE";

export const onNewMovie = (data) => {
    return (dispatch) => {
        dispatch({
            type: NEW_MOVIE,
            ...data
        })
    }
};

export const getMovies = () => {
    return (dispatch) => {
        axios.get('/api').then(res => {
            const movies = {};
            res.data.movies.forEach(e => movies[e.id] = {...e});

            dispatch({
                type: GET_MOVIES,
                movies
            })
        }).catch(err => console.log(err));
    }
};

export const selectMovie = (id) => {
    return (dispatch) => {
        axios.get(`/api/${id}`).then(res => {
            dispatch({type: SELECT_MOVIE, ...res.data});
            emitMovieJoin(id)
        })
    }
};

export const addNewMovie = (name, image, user) => {
    axios.post('/api', {movie: {name, image}, user: user})
        .then(res => console.log('Added movie!', res))
        .catch(err => console.log('Failed adding movie!', err));
};
