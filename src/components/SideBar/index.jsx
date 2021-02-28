import React from "react";
import clsx from "clsx";
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { People } from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 234;

const useStyles = makeStyles((theme) => ({
    root: {
        "& :hover": {
            color: "#ffffff",
        },
    },
    icon: {
        "& :hover": {
            color: theme.palette.primary.main,
        },
    },
    drawer: {
        width: drawerWidth,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = ({ drawerOpen }) => {
    const classes = useStyles();
    const listItemTextProps = { align: "left", variant: "button" };

    const navigation = [[{ key: "users", to: "/app/users", icon: <People color="primary" /> }]];

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
                {navigation.map((links) => (
                    <>
                        <Divider />
                        <List>
                            {links.map((link) => (
                                <ListItem button component={Link} underline="none" to={link.to} key={link.key}>
                                    <ListItemIcon className={classes.icon}>{link.icon}</ListItemIcon>
                                    <ListItemText primaryTypographyProps={listItemTextProps} primary={link.key} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                ))}
            </Drawer>
        </div>
    );
};

export default SideBar;
