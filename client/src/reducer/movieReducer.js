import {CHANGE, GET_MOVIES, NEW_CRITERIA, NEW_MOVIE, SELECT_MOVIE} from "../action/movieActions";

const initialState = {
    selected: {},
    fields: {},
    movies: {}
};

const selectMovie = (state, action) => {
    const fields = {};
    action.movie.criteria.forEach(e => fields[e.id] = {...e});
    delete action.movie.criteria;

    return {
        ...state,
        selected: action.movie,
        fields
    };
}

const change = (state, action) => {
    return {
        ...state,
        movies: {
            ...state.movies,
            [action.id]: {
                ...state.movies[action.id],
                [action.field]: action.value
            }
        },
        selected: {
            ...state.selected,
            [action.field]: action.value
        }
    };
};

const newEntry = (key, state, action) => {
    return {
        ...state,
        [key]: {
            ...state.fields,
            [action.id]: {
                name: action.name
            }
        }
    };
};

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MOVIE:
            return newEntry('movies', state, action);
        case GET_MOVIES:
            return {
                ...state,
                movies: action.movies
            };
        case SELECT_MOVIE:
            return selectMovie(state, action);
        case CHANGE:
            return change(state, action);
        case NEW_CRITERIA:
            return newEntry('fields', state, action);
        default:
            return state;
    }
};