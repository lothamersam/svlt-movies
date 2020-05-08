import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {changeCriteria} from "../../action/movieActions";
import TextField from "@material-ui/core/TextField";

const useStyles = theme => ({
    root: {
        padding: theme.spacing(1),
        '& > *': {
            margin: theme.spacing(1, 0)
        }
    }
});

class CriteriaClass extends React.Component {
    onChange = (name, event) => {
        this.props.changeCriteria(this.props.id, name, event.target.value);
    };

    render = () => (
        <div className={this.props.classes.root}>
            <TextField
                label={"Criteria Name"}
                variant={"outlined"}
                value={this.props.name ? this.props.name : ""}
                onChange={(event) => this.onChange('name', event)}
                fullWidth/>
            <TextField
                label={"Points"}
                variant={"outlined"}
                type={"number"}
                value={this.props.value ? this.props.value : ""}
                onChange={(event) => this.onChange('value', event)}
                fullWidth/>
            <TextField
                multiline
                label={"Notes"}
                variant={"outlined"}
                value={this.props.note ? this.props.note : ""}
                onChange={(event) => this.onChange('notes', event)}
                fullWidth/>
        </div>
    )
}

const mapStateToProps = (state, props) => ({
    ...state.movie.fields[props.id]
});

export const Criteria = withStyles(useStyles)(connect(mapStateToProps, {changeCriteria})(CriteriaClass));

Criteria.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    note: PropTypes.string,
    id: PropTypes.string,
    changeCriteria: PropTypes.func
};
