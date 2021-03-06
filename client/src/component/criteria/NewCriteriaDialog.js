import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {addNewCriteria} from "../../action/movieActions";

export const NewCriteriaDialog = (props) => {
    const [name, setName] = useState("");
    const id = useSelector(state => state.movie.selected.id);

    const onClose = (event) => {
        event.preventDefault();
        setName('');
        addNewCriteria(id, name);
        props.onClose();
    };

    return <Dialog open={props.open} onClose={() => props.onClose()} keepMounted={false}>
        <DialogTitle>Add New Criteria</DialogTitle>
        <form onSubmit={onClose}>
            <DialogContent>
                <TextField
                    label="Criteria Title"
                    variant={"outlined"}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    fullWidth
                    required/>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color="primary" type={"submit"}>
                    Add
                </Button>
            </DialogActions>
        </form>
    </Dialog>
};

NewCriteriaDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};