import React from "react";
import {MovieSubscriber} from "../subscribers/MovieSubscriber";
import {connect} from "react-redux";
import {changeMovie} from "../../action/movieActions";
import PropTypes from "prop-types";
import {MovieEditor} from "./MovieEditor";
import {CriteriaList} from "../criteria/CriteriaList";

class MovieClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false}
    }

    render = () => (
        <MovieSubscriber>
            <MovieEditor/>
            <CriteriaList/>
        </MovieSubscriber>
    );
}

const mapStateToProps = (state) => ({
    selected: state.movie.selected,
    fields: state.movie.fields
});

export const Movie = connect(mapStateToProps, {changeMovie})(MovieClass);

Movie.propTypes = {
    selected: PropTypes.object,
    fields: PropTypes.object
};