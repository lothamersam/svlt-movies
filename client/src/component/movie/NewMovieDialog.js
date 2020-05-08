import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {addNewMovie} from "../../action/movieActions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1, 0)
        }
    }
}));

export const NewMovieDialog = (props) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const user = useSelector(state => state.users.currentUser.name);

    const onClose = (event) => {
        event.preventDefault();
        addNewMovie(name, image, user);
        props.onClose()
    };

    return <Dialog open={props.open} onClose={() => props.onClose()} keepMounted={false}>
        <DialogTitle>Add New Movie</DialogTitle>
        <form onSubmit={onClose}>
            <DialogContent className={classes.root}>
                <TextField
                    label={"Movie Title"}
                    variant={"outlined"}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    fullWidth
                    required/>
                <TextField
                    label="Image URL"
                    variant={"outlined"}
                    value={image}
                    onChange={event => setImage(event.target.value)}
                    fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color="primary" type={"submit"}>
                    Add
                </Button>
            </DialogActions>
        </form>
    </Dialog>
};

NewMovieDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};