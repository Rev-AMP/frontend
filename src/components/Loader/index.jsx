import { Grid } from "@material-ui/core";
import React from "react";

const Loader = () => (
    <Grid container justify="center" alignContent="center">
        <img src={"/miscellaneous/loader.gif"} alt="loading..." />
    </Grid>
);

export default Loader;