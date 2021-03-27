import React from "react";
import clsx from "clsx";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import {
    Account,
    AccountTie,
    BookEducation,
    BookMultiple,
    BookOpenPageVariant,
    CalendarMultiple,
    CalendarToday,
    School,
    ShieldAccount,
} from "mdi-material-ui";
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

    const navigation = [
        [
            { key: "users", to: "/app/users", icon: <Account color="primary" /> },
            { key: "admins", to: "/app/admins", icon: <ShieldAccount color="primary" /> },
            { key: "professors", to: "/app/admins", icon: <AccountTie color="primary" /> },
            { key: "students", to: "/app/admins", icon: <School color="primary" /> },
        ],
        [
            { key: "schools", to: "/app/schools", icon: <BookEducation color="primary" /> },
            { key: "years", to: "/app/years", icon: <CalendarToday color="primary" /> },
            { key: "terms", to: "/app/terms", icon: <CalendarMultiple color="primary" /> },
            { key: "courses", to: "/app/courses", icon: <BookMultiple color="primary" /> },
            { key: "classes", to: "/app/courses", icon: <BookOpenPageVariant color="primary" /> },
        ],
    ];

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
                {navigation.map((links, index) => (
                    <div key={index}>
                        <Divider />
                        <List>
                            {links.map((link) => (
                                <ListItem button component={Link} underline="none" to={link.to} key={link.key}>
                                    <ListItemIcon className={classes.icon}>{link.icon}</ListItemIcon>
                                    <ListItemText primaryTypographyProps={listItemTextProps} primary={link.key} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                ))}
            </Drawer>
        </div>
    );
};

export default SideBar;
