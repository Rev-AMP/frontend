import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles=makeStyles(theme => ({
    customInput: {
        width: "available",
        margin:"1rem",
        padding: "0.75rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "white",
        fontSize: theme.typography.fontSize,
    }
}));

const FormInput = ({ handleChange, handleBlur, ...otherProps }) => {

    const classes = useStyles();
    return (
    <input
        className={classes.customInput}
        onChange={handleChange}
        onBlur={handleBlur}
        {...otherProps}
    />
);
}
export default FormInput;