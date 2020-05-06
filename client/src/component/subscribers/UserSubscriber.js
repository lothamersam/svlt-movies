import React from "react";
import {connect} from "react-redux";
import {subscribeToUserJoin, subscribeToUserList} from "../../socket/userSocketHandler";
import {withSnackbar} from "notistack";
import {userJoin} from "../../action/userActions";
import PropTypes from "prop-types";

class UserSubscriberClass extends React.Component {
    constructor(props) {
        super(props);

        subscribeToUserJoin((data) => {
            this.props.userJoin(data);
            this.props.enqueueSnackbar(`${data.username} joined!`)
        });

        subscribeToUserList((data) => {
            const users = Object.entries(data);
            users.map(([, value]) => this.props.userJoin(value));
            this.props.enqueueSnackbar(`${users[0][1].username} is here with ${users.length} other(s)!`)
        })
    }

    render = () => <div>
        {this.props.children}
    </div>
}

export const UserSubscriber = withSnackbar(connect(undefined, {userJoin})(UserSubscriberClass));
UserSubscriber.propTypes = {
    userJoin: PropTypes.func,
    enqueueSnackbar: PropTypes.func,
    children: PropTypes.node
};
