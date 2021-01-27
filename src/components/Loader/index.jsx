import { Grid } from "@material-ui/core";
import React from "react";

const Loader = () => (
    <Grid container item justify="center" alignContent="center" style={{ height: "100%" }}>
        <img src={"/miscellaneous/loader.gif"} alt="loading..." />
    </Grid>
);

export default Loader;