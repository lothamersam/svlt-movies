import React from "react";
import {connect} from "react-redux";
import {changeCriteria, changeMovie, focusCriteria, newCriteria} from "../../action/movieActions";
import {subscribeToChange, subscribeToFocus, subscribeToNoNewCriteria} from "../../socket/movieSocketHandler";
import PropTypes from "prop-types";

class MovieSubscriberClass extends React.Component {
    constructor(props) {
        super(props);
        subscribeToChange(this.onChangeSubscriber);
        subscribeToNoNewCriteria(this.onNewCriteriaSubscriber);
        subscribeToFocus(this.onFocusSubscriber)
    }

    onChangeSubscriber = (data) => {
        if (data.type === 0) {
            this.props.changeMovie(data.field, data.value, true);
        } else {
            this.props.changeCriteria(data.id, data.field, data.value, true);
        }
    };

    onFocusSubscriber = (data) => {
        if (data.type === 1) {
            this.props.focusCriteria(data.value, data.newValue, data.id, true)
        } else {
            // TODO implement movie focus
        }
    };

    onNewCriteriaSubscriber = (data) => {
        this.props.newCriteria(data.criteria)
    };

    render = () => <div>
        {this.props.children}
    </div>
}

export const MovieSubscriber = connect(undefined, {
    changeMovie,
    newCriteria,
    changeCriteria,
    focusCriteria
})(MovieSubscriberClass);

MovieSubscriber.propTypes = {
    changeMovie: PropTypes.func,
    newCriteria: PropTypes.func,
    changeCriteria: PropTypes.func,
    focusCriteria: PropTypes.func
};
