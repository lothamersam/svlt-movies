import React from "react";
import {connect} from "react-redux";
import {subscribeToUserJoin} from "../../socket/userSocketHandler";
import {withSnackbar} from "notistack";

class UserSubscriberClass extends React.Component {
    constructor(props) {
        super(props);

        subscribeToUserJoin((username) => {
            console.log(username);
            this.props.enqueueSnackbar(`${username} joined!`)
        })
    }

    render = () => <div>
        {this.props.children}
    </div>
}

export const UserSubscriber = withSnackbar(connect(undefined, {})(UserSubscriberClass));