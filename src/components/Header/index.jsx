import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { ExitToApp, Menu } from "mdi-material-ui";

import { logout } from "redux/auth/action";

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.background.default,
        zIndex: theme.zIndex.drawer + 1,
    },
    logoBox: {
        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
            justifyContent: "flex-start",
        },
        marginInline: "1rem",
    },
}));

const Header = ({ handleMenuButtonClick, logout }) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton color="primary" aria-label="open drawer" edge="start" onClick={handleMenuButtonClick}>
                    <Menu />
                </IconButton>
                <Box display="flex" flexGrow={1} className={classes.logoBox}>
                    <Link to="/">
                        <img
                            style={{ height: 50, aspectRatio: 1, padding: 5 }}
                            src={"/logos/revamp_transparent.png"}
                            alt="Rev-AMP"
                        />
                    </Link>
                </Box>
                <IconButton color="primary" aria-label="logout" edge="end" onClick={logout}>
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default connect(null, { logout })(Header);
