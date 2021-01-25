import React from 'react';
import { makeStyles, Button as Btn } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    customButton: {
        margin: "1em",
        border: 0,
        borderRadius: "4px",
        transition: "0.2s",
        width: "available",
        padding: "0.75em 1em",
        fontSize: theme.typography.fontSize,
        // "&:hover": {
        //     backgroundColor: "#77dd77",
        // } TODO:ADD IT BACK SOMEDAY
    },

}))
const Button = ({ color, children, ...otherProps }) => {
    const classes = useStyles()
    return (
        <Btn disableElevation color={color ?? "secondary"} {...otherProps} className={classes.customButton}>
            {children}
        </Btn>
    );
}

export default Button;