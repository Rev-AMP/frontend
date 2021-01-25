import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Box, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { LogOut } from 'redux/auth/action';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        background: theme.palette.background.default,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    }
}));

const Header = ({ handleMenuButtonClick, LogOut }) => {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <Box display='flex' flexGrow={1}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        className={classes.menuButton}
                        onClick={handleMenuButtonClick}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Link to="/">
                        <img style={{ height: 50, aspectRatio: 1, padding: 5 }}
                            src={process.env.PUBLIC_URL + "/logos/revamp_transparent.png"} alt="Rev-AMP" />
                    </Link>
                </Box>
                <IconButton
                    color="primary"
                    aria-label="logout"
                    onClick={LogOut}
                >
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default connect(null, { LogOut })(Header);
