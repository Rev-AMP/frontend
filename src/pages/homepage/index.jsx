import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Avatar, Grid, IconButton, TextField, withStyles } from "@material-ui/core";
import { CameraPlus } from "mdi-material-ui";
import { toast } from "react-toastify";

import Button from "components/Button";
import Loader from "components/Loader";
import { updateUserMe } from "redux/user/action";
import { getUpdatedInfo } from "services/get-updated-info";

const styles = (theme) => ({
    formItem: {
        width: "100%",
    },
    image: {
        height: "35vh",
        minHeight: "11rem",
        width: "35vh",
        minWidth: "11rem",
        fontSize: "6.9rem",
        marginTop: "3rem",
        ...theme.styles.avatar,
    },
    fullScreen: {
        height: "100%",
        width: "100%",
    },
    noFlex: {
        display: "box",
    },
});

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: { ...this.props.currentUser },
            submit: {},
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.errorMessage && this.props.errorMessage) {
            this.setState({ currentUser: { ...this.props.currentUser } });
        }
        if (prevProps.currentUser !== this.props.currentUser) {
            toast.success(`Updated successfully 🙌`, {
                position: toast.POSITION.TOP_CENTER,
            });
            this.setState({ currentUser: { ...this.props.currentUser } });
        }
    }

    handleInputChange = (event) => {
        let { currentUser, submit } = this.state;
        let { name, value, files } = event.target;
        if (event.target.type === "file") {
            submit[name] = files[0];
            currentUser[name] = URL.createObjectURL(files[0]);
        } else {
            submit[name] = currentUser[name] = value !== "" ? value : undefined;
        }
        this.setState({ currentUser, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { currentUser } = this.props;

        const { submit } = this.state;
        const updatedInfo = getUpdatedInfo(currentUser, submit);

        if (Object.keys(updatedInfo).length) {
            if (submit.password && !(submit.confirm_password && submit.password === submit.confirm_password)) {
                toast.error("Passwords don't match 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                delete submit.confirm_password;
                this.props.updateUserMe(submit);
            }
        } else {
            toast.error("Please update some information 😓", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    render() {
        const { currentUser } = this.state;

        if (this.props.isLoading) {
            return <Loader />;
        }

        const { classes } = this.props;

        return (
            <form className={classes.fullScreen} onSubmit={this.handleSubmit}>
                <Grid
                    container
                    direction="row-reverse"
                    justify="flex-end"
                    alignItems="center"
                    className={classes.fullScreen}
                >
                    <Grid container direction="column" justify="center" alignItems="center" lg={4} md={4} sm={12}>
                        <Avatar
                            className={classes.image}
                            src={currentUser.profile_picture}
                            alt={(this.props.currentUser.full_name ?? this.props.currentUser.email).toUpperCase()}
                        />
                        <IconButton color="primary" component="label">
                            <CameraPlus />
                            <input
                                type="file"
                                name="profile_picture"
                                accept="image/png, image/jpeg"
                                onChange={this.handleInputChange}
                                hidden
                            />
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        style={{ height: "69%" }}
                        lg={8}
                        md={8}
                        sm={12}
                    >
                        <Grid container lg={6} md={6} sm={12}>
                            <TextField
                                className={classes.formItem}
                                label="Full Name"
                                name="full_name"
                                value={currentUser.full_name}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid container lg={6} md={6} sm={12}>
                            <TextField
                                className={classes.formItem}
                                label="Email"
                                name="email"
                                value={currentUser.email}
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid container lg={6} md={6} sm={12}>
                            <TextField
                                type="password"
                                className={classes.formItem}
                                label="Password"
                                name="password"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid container lg={6} md={6} sm={12}>
                            <TextField
                                type="password"
                                className={classes.formItem}
                                label="Confirm Password"
                                name="confirm_password"
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid container>
                            <TextField
                                type="text"
                                className={classes.formItem}
                                label="School"
                                name="school"
                                value={currentUser.school ? currentUser.school.name : "No associated School"}
                                error={!currentUser.school}
                                helperText="This cannot be changed from here"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" lg={8} md={8} sm={12}>
                        <Grid container lg={5} md={5} sm={12}>
                            <Button type="submit" variant="contained">
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isLoading: state.user.isLoading || state.school.isLoading,
    errorMessage: state.user.errorMessage,
});

export default withRouter(connect(mapStateToProps, { updateUserMe })(withStyles(styles)(Homepage)));
