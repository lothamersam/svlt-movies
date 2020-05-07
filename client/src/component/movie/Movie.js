import React from "react";
import {MovieSubscriber} from "../subscribers/MovieSubscriber";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {changeMovie} from "../../action/movieActions";
import PropTypes from "prop-types";
import {NewCriteriaDialog} from "../criteria/NewCriteriaDialog";
import Button from "@material-ui/core/Button";
import {MovieEditor} from "./MovieEditor";
import {CriteriaList} from "../criteria/CriteriaList";

const useStyles = theme => ({
    small: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    right: {
        float: "right"
    }
});

class MovieClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }

    render = () => (
        <MovieSubscriber>
            <Button
                className={this.props.classes.right}
                variant={"contained"}
                onClick={() => this.setState({open: true})}>
                Add Criteria
            </Button>
            <NewCriteriaDialog open={this.state.open} onClose={() => this.setState({open: false})}/>
            <MovieEditor/>
            <CriteriaList/>
        </MovieSubscriber>
    );
}

const mapStateToProps = (state) => ({
    selected: state.movie.selected,
    fields: state.movie.fields
});

export const Movie = withStyles(useStyles)(connect(mapStateToProps, {changeMovie})(MovieClass));

Movie.propTypes = {
    selected: PropTypes.object,
    fields: PropTypes.object
};