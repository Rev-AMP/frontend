import React from 'react';
import { makeStyles, Button as Btn } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    customButton: {
        margin: "1em",
        border: 0,
        borderRadius: "4px",
        transition: "0.2s",
        width: "available",
        // width: -moz-available,
        padding: "0.75em 1em",
        // backgroundColor:theme.palette.primary.main,
        fontSize: theme.typography.fontSize,
        "&:hover": {
            backgroundColor: "#77dd77",
        }
    },

}))
const Button = ({ buttonType, handleClick, children, ...otherProps }) => {
    const classes = useStyles()
    return (
        <Btn variant="contained" disableElevation color={buttonType} onClick={handleClick} {...otherProps} className={classes.customButton}>
            {children}
        </Btn>
    );
}

export default Button;