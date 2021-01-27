import React from 'react';
import clsx from 'clsx';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { People, Inbox, Mail } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
    root: {
        "& :hover": {
            color: "#ffffff"
        }
    },
    icon: {
        "& :hover": {
            color: theme.palette.primary.main
        }
    },
    drawer: {
        width: drawerWidth,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

const SideBar = ({ drawerOpen }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerOpen,
                    [classes.drawerClose]: !drawerOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerOpen,
                        [classes.drawerClose]: !drawerOpen,
                    }),
                }}
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button component={Link} underline="none" to="/app/users" key="User">
                        <ListItemIcon className={classes.icon}>
                            <People color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox color="primary" /> : <Mail color="primary" />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default SideBar;
