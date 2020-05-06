import {GET_MOVIES, NEW_MOVIE} from "../action/movieActions";

const initialState = {
    name: "",
    description: "",
    fields: {},
    movies: {}
};

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MOVIE:
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
        case GET_MOVIES:
            return {
                ...state,
                movies: action.movies
            };
        default:
            return state;
    }
};