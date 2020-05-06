import React, {useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {useDispatch, useSelector} from "react-redux";
import {setUsername} from "../action/userActions";

export const LoginDialog = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const loggedIn = useSelector(state => state.users.loggedIn);
    const dispatch = useDispatch();

    return <Dialog open={!loggedIn}>
        <DialogTitle>Enter your stuff!</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Pick something fun!
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                value={name}
                onChange={event => setName(event.target.value)}
                fullWidth/>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="name"
                value={image}
                onChange={event => setImage(event.target.value)}
                fullWidth/>
        </DialogContent>
        <DialogActions>
            <Button variant={"contained"} color="primary" onClick={() => setUsername(name, image)(dispatch)}>
                Set
            </Button>
        </DialogActions>
    </Dialog>
};