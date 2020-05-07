import TextField from "@material-ui/core/TextField";
import React from "react";
import {connect} from "react-redux";
import {changeMovie} from "../../action/movieActions";
import PropTypes from "prop-types";

class MovieEditorClass extends React.Component {
    onChange = (name, event) => {
        this.props.changeMovie(name, event.target.value);
    };

    render = () => (
        <div>
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
                id="link"
                label="Watch Link"
                type="link"
                value={this.props.selected.link}
                onChange={(event) => this.onChange('link', event)}
                fullWidth/>
            <TextField
                rows={5}
                multiline
                margin="dense"
                id="description"
                label="Description"
                type="description"
                value={this.props.selected.description}
                onChange={(event) => this.onChange('description', event)}
                fullWidth/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selected: state.movie.selected,
    fields: state.movie.fields
});

export const MovieEditor = connect(mapStateToProps, {changeMovie})(MovieEditorClass);

MovieEditor.propTypes = {
    selected: PropTypes.object,
    fields: PropTypes.object
};