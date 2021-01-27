import { Grid } from "@material-ui/core";
import React from "react";

const CenterContent = ({ children, style, ...props }) => (
    <Grid container justify="center" alignContent="center" style={{ height: "100%", ...style }} {...props}>
        {children}
    </Grid>
);

export default CenterContent;
