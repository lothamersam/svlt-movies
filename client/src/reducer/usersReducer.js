import {SET_USERNAME, USER_JOIN} from "../action/userActions";

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
                    name: action.name,
                    image: action.image
                }
            };
        case USER_JOIN:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.id]: {
                        name: action.username,
                        image: action.image
                    }
                }
            };
        default:
            return state;
    }
};