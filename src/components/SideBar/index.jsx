import React from "react";
import clsx from "clsx";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { Account, BookEducation, BookMultiple, CalendarMultiple, CalendarToday, ShieldAccount } from "mdi-material-ui";
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
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: drawerWidth,
        },
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: 0,
        [theme.breakpoints.up("md")]: {
            width: theme.spacing(8),
        },
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = ({ drawerOpen, switchDrawer }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const classes = useStyles();
    const listItemTextProps = { align: "left", variant: "button" };

    const navigation = [
        [
            { key: "users", to: "/app/users", icon: <Account color="primary" /> },
            { key: "admins", to: "/app/admins", icon: <ShieldAccount color="primary" /> },
        ],
        [
            { key: "schools", to: "/app/schools", icon: <BookEducation color="primary" /> },
            { key: "years", to: "/app/years", icon: <CalendarToday color="primary" /> },
            { key: "terms", to: "/app/terms", icon: <CalendarMultiple color="primary" /> },
            { key: "courses", to: "/app/courses", icon: <BookMultiple color="primary" /> },
            // { key: "classes", to: "/app/courses", icon: <BookOpenPageVariant color="primary" /> },
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
                                <ListItem
                                    button
                                    component={Link}
                                    underline="none"
                                    to={link.to}
                                    key={link.key}
                                    onClick={() => (matches && drawerOpen ? switchDrawer() : null)}
                                >
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
