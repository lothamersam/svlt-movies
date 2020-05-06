import {SET_USER_ID, SET_USERNAME} from "../action/userActions";

const initialState = {
    users: {},
    currentUser: {},
    loggedIn: false
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                loggedIn: true,
                currentUser: {
                    name: action.name
                }
            };
        case SET_USER_ID:
            return state;
        default:
            return state;
    }
};