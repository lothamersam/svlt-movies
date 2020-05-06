import React from "react";
import {connect} from "react-redux";
import {LoginDialog} from "../component/LoginDialog";
import {UserSubscriber} from "../component/subscribers/UserSubscriber";

class MainContainerClass extends React.Component {
    render = () => (
        <UserSubscriber>
            <LoginDialog/>
        </UserSubscriber>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.users.loggedIn
});

export const MainContainer = connect(mapStateToProps)(MainContainerClass);