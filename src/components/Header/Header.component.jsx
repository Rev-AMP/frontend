import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

const Header = ({ handleMenuButtonClick }) => {
    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="secondary"
                    aria-label="open drawer"
                    edge="start"
                    className={classes.menuButton}
                    onClick={handleMenuButtonClick}
                >
                    <MenuIcon/>
                </IconButton>
                <a href="/">
                    <img style={{height: 50, aspectRatio: 1, padding: 5}}
                         src={process.env.PUBLIC_URL + "/logos/revamp_transparent.png"} alt="Rev-AMP"/>
                </a>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
