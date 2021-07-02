import React from "react";
import { Button as Btn, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    customButton: {
        margin: "1rem",
        border: 0,
        borderRadius: "4px",
        transition: "0.2s",
        width: "available",
        padding: "0.75rem 1rem",
        fontSize: theme.typography.fontSize,
    },
    customButtonHover: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));

const Button = ({ color, variant, children, className, ...otherProps }) => {
    const classes = useStyles();
    const buttonClasses =
        variant === "contained" ? clsx(classes.customButton, classes.customButtonHover) : classes.customButton;

    return (
        <Btn
            disableElevation
            color={color ?? "primary"}
            variant={variant}
            {...otherProps}
            className={clsx(buttonClasses, className)}
        >
            {children}
        </Btn>
    );
};

export default Button;
