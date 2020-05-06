import {emitUserLogin} from "../socket/userSocketHandler";

export const SET_USERNAME = "SET_USERNAME";
export const USER_JOIN = "USER_JOIN";

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

export const userJoin = (data) => {
    return (dispatch) => {
        dispatch({
            type: USER_JOIN,
            ...data
        });
    }
};
