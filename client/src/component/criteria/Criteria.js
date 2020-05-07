import React from "react";
import {connect} from "react-redux";
import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core";

const useStyles = theme => ({
    root: {
        padding: theme.spacing(1)
    }
});

class CriteriaClass extends React.Component {
    render = () => (
        <Card className={this.props.classes.root}>
            <CardContent>
                {this.props.criteria.name}
            </CardContent>
        </Card>
    )
}

const mapStateToProps = (state, props) => ({
    criteria: state.movie.fields[props.id]
});

export const Criteria = withStyles(useStyles)(connect(mapStateToProps)(CriteriaClass));

Criteria.propTypes = {
    criteria: PropTypes.object,
    id: PropTypes.string
};
