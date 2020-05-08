import axios from "axios";
import {emitChange, emitFocus, emitMovieJoin} from "../socket/movieSocketHandler";

export const CHANGE = "CHANGE";

export const changeMovie = (field, value, received) => {
    return (dispatch, getState) => {
        const {movie} = getState();

        dispatch({
            type: CHANGE,
            id: movie.selected.id,
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
        dispatch({type: NEW_MOVIE, ...data})
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

export const NEW_CRITERIA = "NEW_CRITERIA";
export const CHANGE_CRITERIA = "CHANGE_CRITERIA";
export const FOCUS_CRITERIA = "FOCUS_CRITERIA";

export const newCriteria = (data) => {
    return (dispatch) => {
        dispatch({type: NEW_CRITERIA, ...data})
    }
};

export const changeCriteria = (id, field, value, received) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_CRITERIA,
            id,
            field,
            value
        });

        if (!received) {
            emitChange(id, 1, field, value);
        }
    }
};

export const focusCriteria = (value, newValue, id, received) => {
    return (dispatch) => {
        dispatch({
            type: FOCUS_CRITERIA,
            value,
            newValue,
            id
        });

        if (!received) {
            emitFocus(1, value, newValue, id);
        }
    }
};

export const addNewMovie = (name, image, user) => {
    axios.post('/api', {movie: {name, image}, user: user})
        .then(res => console.log('Added movie!', res))
        .catch(err => console.log('Failed adding movie!', err));
};

export const addNewCriteria = (id, name) => {
    axios.post(`/api/${id}`, {name})
        .then(res => console.log('Added movie!', res))
        .catch(err => console.log('Failed adding movie!', err))
};
