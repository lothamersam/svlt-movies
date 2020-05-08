import {emitUserLogin} from "../socket/userSocketHandler";

export const SET_USERNAME = "SET_USERNAME";
export const USER_ID = "USER_ID";
export const USER_JOIN = "USER_JOIN";
export const USER_LEAVE = "USER_LEAVE";

export const setUsername = (name, image) => {
    return (dispatch) => {
        dispatch({
            type: SET_USERNAME,
            name,
            image
        });

        emitUserLogin(name, image)
    }
};

export const userId = (id) => {
    return (dispatch) => {
        dispatch({
            type: USER_ID,
            id
        })
    }
};

export const userJoin = (data) => {
    return (dispatch) => {
        dispatch({
            type: USER_JOIN,
            ...data
        });
    }
};

export const userLeave = (data) => {
    return (dispatch) => {
        dispatch({
            type: USER_LEAVE,
            ...data
        });
    }
};

export const userReLogin = () => {
    return (dispatch, getState) => {
        const {currentUser} = getState().users;

        emitUserLogin(currentUser.name, currentUser.image)
    }
};