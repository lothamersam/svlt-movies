import React from "react";
import {useSelector} from "react-redux";
import {Criteria} from "./Criteria";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2)
        }
    }
}));

export const CriteriaList = () => {
    const {fields} = useSelector(state => state.movie);
    const classes = useStyles();

    return <div className={classes.root}>
        {Object.keys(fields).map((key) => (
            <Criteria key={key} id={key}/>
        ))}
    </div>
};