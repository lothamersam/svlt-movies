import React from "react";
import SpeedDial from "@material-ui/lab/SpeedDial";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import {NewMovieDialog} from "./movie/NewMovieDialog";
import {NewCriteriaDialog} from "./criteria/NewCriteriaDialog";
import PostAddIcon from '@material-ui/icons/PostAdd';
import {MovieSubscriber} from "./subscribers/MovieSubscriber";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    wrapper: {
        position: 'relative',
        marginTop: theme.spacing(3),
        height: "100%",
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: theme.spacing(2),
            left: theme.spacing(2),
        },
    },
}));

export const FAB = () => {
    const classes = useStyles();
    const {id} = useSelector(state => state.movie.selected);
    const [open, setOpen] = React.useState(false);
    const [addingMovie, setAddingMovie] = React.useState(false);
    const [addingCriteria, setAddingCriteria] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return <div>
        <NewMovieDialog open={addingMovie} onClose={() => setAddingMovie(false)}/>
        <NewCriteriaDialog open={addingCriteria} onClose={() => setAddingCriteria(false)}/>
        <SpeedDial
            ariaLabel="FAB"
            className={classes.speedDial}
            icon={<SpeedDialIcon/>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}>
            <SpeedDialAction
                title={"Add new movie"}
                icon={<QueuePlayNextIcon/>}
                tooltipTitle={"Add movie"}
                onClick={() => setAddingMovie(true)}/>
            {id && <SpeedDialAction
                title={"Add new criteria"}
                icon={<PostAddIcon/>}
                tooltipTitle={"Add new criteria"}
                onClick={() => setAddingCriteria(true)}/>}
        </SpeedDial>
    </div>
};
