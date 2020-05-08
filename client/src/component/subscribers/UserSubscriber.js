import React from "react";
import {connect} from "react-redux";
import {
    subscribeToDisconnect,
    subscribeToUserJoin,
    subscribeToUserLeave,
    subscribeToUserList
} from "../../socket/userSocketHandler";
import {withSnackbar} from "notistack";
import {userId, userJoin, userLeave, userReLogin} from "../../action/userActions";
import PropTypes from "prop-types";
import {UserIcon} from "../user/UserIcon";
import {UserList} from "../user/UserList";

class UserSubscriberClass extends React.Component {
    constructor(props) {
        super(props);
        subscribeToUserJoin(this.userJoinSubscriber);
        subscribeToUserList(this.userListSubscriber);
        subscribeToUserLeave(this.userLeaveSubscriber);
        subscribeToDisconnect(this.disconnectSubscriber)
    }

    userJoinSubscriber = (data) => {
        this.props.userJoin(data);
        this.props.enqueueSnackbar(`${data.username} joined!`, {
            action: <UserIcon user={{name: data.username, ...data}}/>
        })
    };

    userListSubscriber = (data) => {
        this.props.userId(data.id);
        const users = Object.entries(data.users);

        if (users.length > 0) {
            users.map(([, value]) => this.props.userJoin(value));
            this.props.enqueueSnackbar(`${users[0][1].username} is here with ${users.length - 1} other(s)!`, {
                action: <UserList/>
            })
        }
    };

    userLeaveSubscriber = (data) => {
        this.props.userLeave(data);
        this.props.enqueueSnackbar(`${data.username} left!`)
    };

    disconnectSubscriber = () => {
        this.props.userReLogin();
        console.log("Disconnected from server... reconnect attempted")
    };

    render = () => <div>
        {this.props.children}
    </div>
}

export const UserSubscriber = withSnackbar(connect(undefined, {
    userId,
    userJoin,
    userLeave,
    userReLogin
})(UserSubscriberClass));

UserSubscriber.propTypes = {
    userJoin: PropTypes.func,
    userLeave: PropTypes.func,
    enqueueSnackbar: PropTypes.func,
    children: PropTypes.node
};
