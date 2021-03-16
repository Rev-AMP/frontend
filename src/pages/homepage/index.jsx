import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles, Grid, TextField, IconButton, Avatar } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import { toast } from "react-toastify";

import CenterContent from "components/CenterContent";
import Button from "components/Button";
import Loader from "components/Loader";
import { updateUserMe } from "redux/user/action";
import { fetchSchool } from "redux/school/action";
import { getUpdatedInfo } from "../../utils";

const styles = (theme) => ({
    formItem: {
        width: "100%",
    },
    action: {
        width: "69%",
        ...theme.styles.centerItem,
    },
    image: {
        height: "16.9rem",
        width: "16.9rem",
        fontSize: "6.9rem",
        marginBottom: "2rem",
        ...theme.styles.avatar,
    },
    fullScreen: {
        height: "100%",
        width: "100%",
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

    componentDidMount() {
        if (this.props.currentUser.school) {
            this.props.fetchSchool(this.props.currentUser.school_id);
        }
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

        const { classes, selectedSchool } = this.props;

        return (
            <CenterContent>
                <form className={classes.fullScreen} onSubmit={this.handleSubmit}>
                    <Grid container direction="column" wrap="nowrap" className={classes.fullScreen}>
                        <Grid container wrap="nowrap" className={classes.fullScreen}>
                            <Grid container direction="column" justify="space-evenly">
                                <Grid container justify="space-between" wrap="nowrap">
                                    <TextField
                                        className={classes.formItem}
                                        label="Full Name"
                                        name="full_name"
                                        value={currentUser.full_name}
                                        onChange={this.handleInputChange}
                                    />
                                    <TextField
                                        className={classes.formItem}
                                        label="Email"
                                        name="email"
                                        value={currentUser.email}
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>

                                <Grid container justify="space-between" wrap="nowrap">
                                    <TextField
                                        type="password"
                                        className={classes.formItem}
                                        label="Password"
                                        name="password"
                                        onChange={this.handleInputChange}
                                    />
                                    <TextField
                                        type="password"
                                        className={classes.formItem}
                                        label="Confirm Password"
                                        name="confirm_password"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>

                                <Grid container justify="space-between" wrap="nowrap">
                                    <TextField
                                        type="text"
                                        className={classes.formItem}
                                        label="School"
                                        name="school"
                                        value={selectedSchool ? selectedSchool.name : "No associated School"}
                                        error={!selectedSchool}
                                        helperText="This cannot be changed from here"
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="center"
                                style={{ width: "50%" }}
                            >
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Avatar
                                        className={classes.image}
                                        src={currentUser.profile_picture}
                                        alt={(
                                            this.props.currentUser.full_name ?? this.props.currentUser.email
                                        ).toUpperCase()}
                                    />
                                    <IconButton color="primary" component="label">
                                        <AddAPhoto />
                                        <input
                                            type="file"
                                            name="profile_picture"
                                            accept="image/png, image/jpeg"
                                            onChange={this.handleInputChange}
                                            hidden
                                        />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Button type="submit" variant="contained" className={classes.action}>
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
    isLoading: state.user.isLoading || state.school.isLoading,
    selectedSchool: state.school.selectedSchool,
    errorMessage: state.user.errorMessage,
});

export default withRouter(connect(mapStateToProps, { updateUserMe, fetchSchool })(withStyles(styles)(Homepage)));
