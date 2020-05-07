import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {addNewMovie} from "../action/movieActions";

export const NewMovieDialog = (props) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const user = useSelector(state => state.users.currentUser.name);

    const onClose = () => {
        addNewMovie(name, image, user);
        props.onClose()
    };

    return <Dialog open={props.open} onClose={() => props.onClose()} keepMounted={false}>
        <DialogTitle>Add New Movie</DialogTitle>
        <form>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="Movie Title"
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    fullWidth
                    required/>
                <TextField
                    margin="dense"
                    id="image"
                    label="Image URL"
                    type="text"
                    value={image}
                    onChange={event => setImage(event.target.value)}
                    fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color="primary" onClick={onClose}>
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