import React from "react";
import {connect} from "react-redux";
import {LoginDialog} from "../component/LoginDialog";
import {UserSubscriber} from "../component/subscribers/UserSubscriber";
import {subscribeToNewMovie} from "../socket/movieSocketHandler";
import {MovieDrawer} from "../component/MovieDrawer";
import {getMovies, onNewMovie, selectMovie} from "../action/movieActions";
import PropTypes from "prop-types";
import {withSnackbar} from "notistack";
import Skeleton from "@material-ui/lab/Skeleton";
import {Movie} from "../component/movie/Movie";
import {FAB} from "../component/FAB";

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
        <div>
            <UserSubscriber>
                <LoginDialog/>
                <MovieDrawer selectMovie={this.props.selectMovie}>
                    {this.props.selected.id ? <Movie/> : <Skeleton/>}
                </MovieDrawer>
            </UserSubscriber>
            <FAB/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    selected: state.movie.selected
});

export const MainContainer = withSnackbar(connect(mapStateToProps, {
    getMovies,
    onNewMovie,
    selectMovie
})(MainContainerClass));

MainContainer.propTypes = {
    selected: PropTypes.object,
    getMovies: PropTypes.func,
    enqueueSnackbar: PropTypes.func,
    onNewMovie: PropTypes.func,
    selectMovie: PropTypes.func
};