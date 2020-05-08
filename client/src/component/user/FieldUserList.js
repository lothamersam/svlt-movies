import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {focusCriteria} from "../../action/movieActions";

const useStyles = makeStyles((theme) => ({
    avatar: {
        border: "1.5px solid #ffffff"
    },
    small: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    }
}));

export const FieldUserList = ({fieldId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.users);
    const field = useSelector(state => state.movie.fields[fieldId]);

    if (field.users) {
        return <AvatarGroup max={2} classes={{avatar: classes.avatar}}>
            {Object.keys(field.users).map((key, index) => {
                const user = users[key];

                if (user) {
                    return <Tooltip key={index} title={user.name ? user.name : ""}>
                        <Avatar className={classes.small} src={user.image} alt={user.username}/>
                    </Tooltip>
                } else {
                    // user is not here anymore
                    focusCriteria(fieldId, 0, key, true)(dispatch);
                    return <div hidden/>
                }
            })}
        </AvatarGroup>
    }

    return <div hidden/>
};