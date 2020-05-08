import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Criteria} from "./Criteria";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {UserIcon} from "../user/UserIcon";
import {focusCriteria} from "../../action/movieActions";
import {FieldUserList} from "../user/FieldUserList";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}>
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
    </div>
};

const a11yProps = (index) => ({
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 300,
        margin: theme.spacing(2, 0)
    },
    tabs: {
        minWidth: 130,
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export const CriteriaList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {fields} = useSelector(state => state.movie);
    const {users, currentUser} = useSelector(state => state.users);
    const [value, setValue] = React.useState(fields ? Object.keys(fields)[0] : 0);

    const handleChange = (event, newValue) => {
        focusCriteria(value, newValue, currentUser.id)(dispatch);
        setValue(newValue);
    };

    return <Paper className={classes.root}>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Criteria Tabs"
            className={classes.tabs}>
            {Object.entries(fields).map(([key, value], index) => (
                <Tab
                    icon={value.users && <FieldUserList fieldId={key}/>}
                    label={value.name}
                    value={key}
                    key={key} {...a11yProps(index)}/>
            ))}
        </Tabs>
        {Object.keys(fields).map((key) => (
            <TabPanel value={value} index={key} key={key} id={key}>
                <Criteria id={key}/>
            </TabPanel>
        ))}
    </Paper>
};
