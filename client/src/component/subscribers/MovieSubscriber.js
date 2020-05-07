import React from "react";
import {connect} from "react-redux";
import {changeMovie} from "../../action/movieActions";
import {subscribeToChange} from "../../socket/movieSocketHandler";
import PropTypes from "prop-types";

class MovieSubscriberClass extends React.Component {
    constructor(props) {
        super(props);
        subscribeToChange(this.onChangeSubscriber)
    }

    onChangeSubscriber = (data) => {
        this.props.changeMovie(data.field, data.value, true);
    };

    render = () => <div>
        {this.props.children}
    </div>
}

export const MovieSubscriber = connect(undefined, {changeMovie})(MovieSubscriberClass);
MovieSubscriber.propTypes = {
    changeMovie: PropTypes.func
};
