import TextField from "@material-ui/core/TextField";
import React from "react";
import {connect} from "react-redux";
import {changeMovie} from "../../action/movieActions";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";

const useStyles = (theme) => ({
   root: {
       padding: theme.spacing(2),
       margin: theme.spacing(2, 0),
       '& > *': {
           margin: theme.spacing(1, 0)
       }
   }
});

class MovieEditorClass extends React.Component {
    onChange = (name, event) => {
        this.props.changeMovie(name, event.target.value);
    };

    render = () => (
        <Paper className={this.props.classes.root}>
            <TextField
                label={"Movie Title"}
                variant={"outlined"}
                value={this.props.selected.name}
                onChange={(event) => this.onChange('name', event)}
                fullWidth/>
            <TextField
                label={"Watch Link"}
                variant={"outlined"}
                value={this.props.selected.link}
                onChange={(event) => this.onChange('link', event)}
                fullWidth/>
            <TextField
                multiline
                label={"Description"}
                variant={"outlined"}
                value={this.props.selected.description}
                onChange={(event) => this.onChange('description', event)}
                fullWidth/>
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    selected: state.movie.selected,
    fields: state.movie.fields
});

export const MovieEditor = withStyles(useStyles)(connect(mapStateToProps, {changeMovie})(MovieEditorClass));

MovieEditor.propTypes = {
    selected: PropTypes.object,
    fields: PropTypes.object
};