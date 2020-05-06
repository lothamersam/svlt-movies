import {combineReducers} from "redux";
import {movieReducer} from "./movieReducer";
import {usersReducer} from "./usersReducer";

export const rootReducer = combineReducers({
    movie: movieReducer,
    users: usersReducer
});