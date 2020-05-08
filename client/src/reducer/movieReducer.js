import {
    CHANGE,
    CHANGE_CRITERIA,
    FOCUS_CRITERIA,
    GET_MOVIES,
    NEW_CRITERIA,
    NEW_MOVIE,
    SELECT_MOVIE
} from "../action/movieActions";

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
};

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
            ...state[key],
            [action.id]: {
                name: action.name
            }
        }
    };
};

const changeCriteria = (state, action) => ({
    ...state,
    fields: {
        ...state.fields,
        [action.id]: {
            ...state.fields[action.id],
            [action.field]: action.value
        }
    }
});

const appendUser = (state, action) => ({
    ...state,
    fields: {
        ...state.fields,
        [action.newValue]: {
            ...state.fields[action.newValue],
            users: {
                ...state.fields[action.newValue].users,
                [action.id]: true
            }
        }
    }
});

const focusCriteria = (state, action) => {
    if (state.fields[action.value].users) {
        delete state.fields[action.value].users[action.id];
        if (Object.keys(state.fields[action.value].users).length === 0) {
            delete state.fields[action.value].users
        }
    }

    if (action.newValue > 0) {
        return appendUser(state, action);
    } else {
        return state
    }
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
        case CHANGE_CRITERIA:
            return changeCriteria(state, action);
        case FOCUS_CRITERIA:
            return focusCriteria(state, action);
        default:
            return state;
    }
};