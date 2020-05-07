import React from "react";
import {MovieSubscriber} from "../subscribers/MovieSubscriber";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {changeMovie} from "../../action/movieActions";
import PropTypes from "prop-types";

const useStyles = theme => ({
    small: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    }
});

class MovieEditorClass extends React.Component {
    onChange = (name, event) => {
        this.props.changeMovie(name, event.target.value);
    };

    render = () => {
        return <MovieSubscriber>
            <TextField
                margin="dense"
                id="name"
                label="Movie Title"
                type="name"
                value={this.props.selected.name}
                onChange={(event) => this.onChange('name', event)}
                fullWidth/>
            <TextField
                margin="dense"
                id="name"
                label="Watch Link"
                type="name"
                value={this.props.selected.link}
                onChange={(event) => this.onChange('link', event)}
                fullWidth/>
            <TextField
                rows={5}
                multiline
                margin="dense"
                id="name"
                label="Description"
                type="name"
                value={this.props.selected.description}
                onChange={(event) => this.onChange('description', event)}
                fullWidth/>
        </MovieSubscriber>
    }
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