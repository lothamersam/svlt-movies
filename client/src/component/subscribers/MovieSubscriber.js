import React from "react";
import {connect} from "react-redux";
import {changeMovie, newCriteria} from "../../action/movieActions";
import {subscribeToChange, subscribeToNoNewCriteria} from "../../socket/movieSocketHandler";
import PropTypes from "prop-types";

class MovieSubscriberClass extends React.Component {
    constructor(props) {
        super(props);
        subscribeToChange(this.onChangeSubscriber);
        subscribeToNoNewCriteria(this.onNewCriteriaSubscriber)
    }

    onChangeSubscriber = (data) => {
        this.props.changeMovie(data.field, data.value, true);
    };

    onNewCriteriaSubscriber = (data) => {
        this.props.newCriteria(data.criteria)
    };

    render = () => <div>
        {this.props.children}
    </div>
}

export const MovieSubscriber = connect(undefined, {changeMovie, newCriteria})(MovieSubscriberClass);

MovieSubscriber.propTypes = {
    changeMovie: PropTypes.func
};
