import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar, Box, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { Menu, ExitToApp } from "@material-ui/icons";

import { LogOut } from "redux/auth/action";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        background: theme.palette.background.default,
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: "1rem",
    },
}));

const Header = ({ handleMenuButtonClick, LogOut }) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        className={classes.menuButton}
                        onClick={handleMenuButtonClick}
                    >
                        <Menu />
                    </IconButton>
                    <Link to="/">
                        <img
                            style={{ height: 50, aspectRatio: 1, padding: 5 }}
                            src={"/logos/revamp_transparent.png"}
                            alt="Rev-AMP"
                        />
                    </Link>
                </Box>
                <IconButton color="primary" aria-label="logout" onClick={LogOut}>
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default connect(null, { LogOut })(Header);
