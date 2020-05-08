import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    avatar: {
        border: "1.5px solid #ffffff"
    }
}));

export const UserList = () => {
    const classes = useStyles();
    const {users} = useSelector(state => state.users);

    return <AvatarGroup max={2} classes={{avatar: classes.avatar}}>
        {Object.entries(users).map(([, value], index) => (
            <Tooltip key={index} title={value.name ? value.name : ""}>
                <Avatar src={value.image} alt={value.username}/>
            </Tooltip>
        ))}
    </AvatarGroup>
}