import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    Avatar,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    MenuItem,
    Switch,
    TextField,
    Typography,
    withStyles,
} from "@material-ui/core";
import { CameraPlus } from "mdi-material-ui";

import { createUser, fetchUser, updateUser } from "redux/user/action";
import { getUpdatedInfo } from "services/get-updated-info";
import Button from "components/Button";
import PopupModal from "components/PopupModal";
import SchoolSelect from "pages/schools/components/SchoolSelect";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
    image: {
        ...theme.styles.centerItem,
        ...theme.styles.avatar,
        height: "9rem",
        width: "9rem",
        fontSize: "4rem",
    },
});

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            submit: {},
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.userId !== null && this.props.userId !== undefined) {
            this.props.fetchUser(this.props.userId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedUser !== prevProps.selectedUser) {
            this.setState({
                user: { ...this.props.selectedUser } ?? {},
            });

            if (this.state.formSubmitted) {
                const action = this.props.userId ? "updated" : "created";
                toast.success(`User ${this.props.selectedUser.full_name} ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                this.props.onClose();
            }
        }
    }

    handleInputChange = (event) => {
        let { user, submit } = this.state;
        const { name, type, files } = event.target;

        switch (type) {
            case "checkbox":
                user[name] = submit[name] = event.target.checked;
                break;

            case "file":
                submit[name] = files[0];
                user[name] = URL.createObjectURL(files[0]);
                break;

            default:
                user[name] = submit[name] = event.target.value;
                break;
        }

        this.setState({ user, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;
        const { userId, selectedUser } = this.props;

        if (userId) {
            const updatedInfo = getUpdatedInfo(selectedUser, submit);
            if (Object.keys(updatedInfo).length) {
                this.props.updateUser(updatedInfo);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            if (["email", "type", "password"].every((key) => submit[key])) {
                this.props.createUser(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please add email, type and password 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    render() {
        const { classes, userId, isLoading, isOpen, onClose } = this.props;
        const action = userId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} User
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <Avatar
                        className={classes.image}
                        src={this.state.user.profile_picture}
                        alt={(this.state.user.full_name ?? this.state.user.email ?? "").toUpperCase()}
                    />
                    <Grid container justify="center" style={{ paddingTop: "0.5rem" }}>
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
                    <TextField
                        type="text"
                        name="full_name"
                        label="Full Name"
                        value={this.state.user.full_name ?? ""}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        type="email"
                        name="email"
                        label="Email"
                        value={this.state.user.email ?? ""}
                        onChange={this.handleInputChange}
                        required={!userId}
                    />
                    <TextField
                        select
                        name="type"
                        label="User Type"
                        value={this.state.user.type ?? ""}
                        onChange={this.handleInputChange}
                        required={!userId}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="professor">Professor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="superuser">Superuser</MenuItem>
                    </TextField>
                    <SchoolSelect
                        name="school_id"
                        label="School"
                        value={this.state.user.school_id ?? ""}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        value={this.state.user.password ?? ""}
                        onChange={this.handleInputChange}
                        required={!userId}
                    />
                    {userId && (
                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_active"
                                    checked={this.state.user.is_active ?? false}
                                    onChange={this.handleInputChange}
                                    color="primary"
                                    required={!userId}
                                />
                            }
                            label="Active"
                            className={classes.centerItem}
                        />
                    )}
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </PopupModal>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedUser: state.user.selectedUser,
    isLoading: state.user.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchUser, createUser, updateUser })(UserModal));
