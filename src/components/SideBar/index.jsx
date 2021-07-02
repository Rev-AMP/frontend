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
import {
    Account,
    BookEducation,
    BookMultiple,
    CalendarMultiple,
    CalendarToday,
    ShieldAccount,
    Table,
    File,
    BookOpenPageVariant,
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
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        width: drawerWidth,
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(8),
        [theme.breakpoints.down("md")]: {
            width: 0,
        },
    },
    toolbar: theme.mixins.toolbar,
}));

const SideBar = ({ drawerOpen, switchDrawer, currentUser }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const classes = useStyles();
    const listItemTextProps = { align: "left", variant: "button" };

    let navigation = [];
    if (currentUser.type === "student") {
        navigation = navigation.concat([
            [{ key: "timetable", to: "/timetable", icon: <Table color="primary" /> }],
            [{ key: "assignments", to: "/", icon: <File color="primary" /> }],
        ]);
    }
    if (currentUser.type === "professor") {
        navigation = navigation.concat([
            [{ key: "timetable", to: "/timetable", icon: <Table color="primary" /> }],
            [{ key: "assignments", to: "/", icon: <File color="primary" /> }],
        ]);
    }
    if (currentUser.is_admin) {
        // TODO: append according to perms
        navigation = navigation.concat([
            [
                { key: "users", to: "/users", icon: <Account color="primary" /> },
                { key: "admins", to: "/admins", icon: <ShieldAccount color="primary" /> },
            ],
            [
                { key: "schools", to: "/schools", icon: <BookEducation color="primary" /> },
                { key: "years", to: "/years", icon: <CalendarToday color="primary" /> },
                { key: "terms", to: "/terms", icon: <CalendarMultiple color="primary" /> },
                { key: "courses", to: "/courses", icon: <BookMultiple color="primary" /> },
            ],
        ]);
    }

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
