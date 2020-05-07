import {CHANGE, GET_MOVIES, NEW_MOVIE, SELECT_MOVIE} from "../action/movieActions";

const initialState = {
    selected: {},
    fields: {},
    movies: {}
};

function selectMovie(action, state) {
    const fields = {};
    action.movie.criteria.forEach(e => fields[e.id] = {...e});
    delete action.movie.criteria;

    return {
        ...state,
        selected: action.movie,
        fields
    };
}

function newMovie(state, action) {
    return {
        ...state,
        movies: {
            ...state.movies,
            [action.id]: {
                name: action.name,
                image: action.image
            }
        }
    };
}

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MOVIE:
            return newMovie(state, action);
        case GET_MOVIES:
            return {
                ...state,
                movies: action.movies
            };
        case SELECT_MOVIE:
            return selectMovie(action, state);
        case CHANGE:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    [action.field]: action.value
                }
            };
        default:
            return state;
    }
};