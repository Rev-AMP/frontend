import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles, Grid, TextField, Typography } from "@material-ui/core";

import CenterContent from "components/CenterContent";
import Button from "components/Button";

const styles = (theme) => ({
    textField: {
        width: "30%",
    },
    action: {
        width: "30%",
        ...theme.styles.centerItem,
    },
    image: {
        maxHeight: "6.9rem",
        maxWidth: "6.9rem",
        ...theme.styles.centerItem,
    },
    imageButton: {
        width: "min-content",
        ...theme.styles.centerItem,
    },
    fullScreen: {
        height: "100%",
        width: "100%",
        overflow: "auto",
    },
});

class Homepage extends Component {
    render() {
        const { classes, currentUser } = this.props;
        const title = (currentUser.is_admin ? "Update " : "") + "Your Details";
        return (
            <CenterContent>
                <form className={classes.fullScreen}>
                    <Grid
                        container
                        direction="column"
                        justify={currentUser.is_admin ? "space-between" : "space-evenly"}
                        wrap="nowrap"
                        className={classes.fullScreen}
                    >
                        <Typography color="primary" variant={currentUser.is_admin ? "h2" : "h1"}>
                            {title}
                        </Typography>

                        {currentUser.is_admin ? (
                            <Button component="label" hidden={!currentUser.is_admin} className={classes.imageButton}>
                                <img
                                    className={classes.image}
                                    src={currentUser.profile_picture ?? "/logos/revamp_favicon_transparent.png"}
                                    alt=""
                                />
                                <input type="file" name="profile_picture" hidden />
                            </Button>
                        ) : (
                            <img
                                className={classes.image}
                                src={currentUser.profile_picture ?? "/logos/revamp_favicon_transparent.png"}
                                alt=""
                            />
                        )}

                        <Grid container justify="space-around">
                            <TextField
                                className={classes.textField}
                                label="Full Name"
                                name="full_name"
                                value={currentUser.full_name}
                                disabled={!currentUser.is_admin}
                            />
                            <TextField
                                className={classes.textField}
                                label="Email"
                                name="email"
                                value={currentUser.email}
                                disabled={!currentUser.is_admin}
                            />
                        </Grid>

                        <Grid container justify="space-around" hidden={!currentUser.is_admin}>
                            <TextField type="password" className={classes.textField} label="Password" name="password" />
                            <TextField type="password" className={classes.textField} label="Confirm Password" />
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.action}
                            hidden={!currentUser.is_admin}
                        >
                            Update
                        </Button>
                    </Grid>
                </form>
            </CenterContent>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Homepage)));
