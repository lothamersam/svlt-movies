import axios from "axios";

export const ON_CHANGE = "ON_CHANGE";
export const ON_FOCUS = "ON_FOCUS";
export const ON_ADD = "ON_ADD";
export const ON_DELETE = "ON_DELETE";

export const NEW_MOVIE = "NEW_MOVIE";
export const GET_MOVIES = "GET_MOVIES";

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
        axios.get('/api/').then(res => {
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
      console.log(id);
  }
};