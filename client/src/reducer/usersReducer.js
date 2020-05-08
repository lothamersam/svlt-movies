import {SET_USERNAME, USER_ID, USER_JOIN, USER_LEAVE} from "../action/userActions";

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
        case USER_ID:
            return {
                ...state,
                loggedIn: true,
                currentUser: {
                    ...state.currentUser,
                    id: action.id
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
        case USER_LEAVE:
            // TODO notify field subscribers
            delete state.users[action.id];
            return {...state};
        default:
            return state;
    }
};