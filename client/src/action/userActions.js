import {userLogin} from "../socket/userSocketHandler";

export const SET_USERNAME = "SET_USERNAME";
export const SET_USER_ID = "SET_USER_ID";

const setUsernameAction = (name) => ({
    type: SET_USERNAME,
    name
});

export const setUsername = (name) => {
    return (dispatch) => {
        dispatch(setUsernameAction(name));
        userLogin(name)
    }
};
