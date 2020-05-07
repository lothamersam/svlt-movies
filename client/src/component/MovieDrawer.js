import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import {NewMovieDialog} from "./movie/NewMovieDialog";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    avatar: {
        border: "1.5px solid #ffffff"
    }
}));

export const MovieDrawer = (props) => {
    const classes = useStyles();
    const [adding, setAdding] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const {movies, selected} = useSelector(state => state.movie);
    const {currentUser, users} = useSelector(state => state.users);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClick = key => {
        setOpen(false);
        props.selectMovie(key)
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {[classes.appBarShift]: open,})}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {selected.name ? selected.name : 'Select a movie'}
                    </Typography>
                    <div className={classes.grow}/>
                    <AvatarGroup max={2} classes={{avatar: classes.avatar}}>
                        <Avatar src={currentUser.image} alt={currentUser.name}/>
                        {Object.entries(users).map(e => <Avatar key={e[1]} src={e[1].image} alt={e[1].name}/>)}
                    </AvatarGroup>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{paper: classes.drawerPaper}}>
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button onClick={() => setAdding(true)}>
                        <ListItemIcon><QueuePlayNextIcon/></ListItemIcon>
                        <ListItemText primary={"Add new movie"}/>
                    </ListItem>
                    <Divider/>
                    {Object.entries(movies).map(([key, value]) => (
                        <ListItem button key={key} onClick={() => onClick(key)}>
                            <ListItemIcon><Avatar src={value.image} alt={value.name}/></ListItemIcon>
                            <ListItemText primary={value.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <NewMovieDialog open={adding} onClose={() => setAdding(false)}/>
            <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
                <div className={classes.drawerHeader}/>
                {props.children}
            </main>
        </div>
    );
};

MovieDrawer.propTypes = {
    children: PropTypes.node,
    selectMovie: PropTypes.func
};