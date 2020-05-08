import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    }
}));

export const UserIcon = ({user, small}) => {
    const classes = useStyles();

    return <Tooltip title={user.name ? user.name : ""}>
        <Avatar className={small && classes.small} src={user.image} alt={user.username}/>
    </Tooltip>;
};
