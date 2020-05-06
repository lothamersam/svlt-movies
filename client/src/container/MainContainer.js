import React from "react";
import {connect} from "react-redux";
import {LoginDialog} from "../component/LoginDialog";
import {UserSubscriber} from "../component/subscribers/UserSubscriber";
import {subscribeToNewMovie} from "../socket/movieSocketHandler";
import {MovieDrawer} from "../component/MovieDrawer";
import Typography from "@material-ui/core/Typography";
import {onNewMovie, getMovies, selectMovie} from "../action/movieActions";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";

class MainContainerClass extends React.Component {
    constructor(props) {
        super(props);

        subscribeToNewMovie(data => {
            console.log(data);
            this.props.enqueueSnackbar(`${data.user} added ${data.movie.name} to the movie list`);
            this.props.onNewMovie(data.movie)
        })
    }

    componentDidMount = () => this.props.getMovies();

    render = () => (
        <UserSubscriber>
            <LoginDialog/>
            <MovieDrawer selectMovie={this.props.selectMovie}>
                <Typography>wow</Typography>
            </MovieDrawer>
        </UserSubscriber>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.users.loggedIn
});

export const MainContainer = withSnackbar(connect(mapStateToProps, {
    getMovies,
    onNewMovie,
    selectMovie
})(MainContainerClass));

MainContainer.propTypes = {
    getMovies: PropTypes.func,
    enqueueSnackbar: PropTypes.func,
    onNewMovie: PropTypes.func,
    selectMovie: PropTypes.func
};