import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { withStyles, Typography, Divider, FormControlLabel, Switch, TextField, MenuItem } from "@material-ui/core";

import { FetchUser, CreateUser, UpdateUser } from "redux/user/action";
import Button from "components/Button";
import PopupModal from "components/PopupModal";

toast.configure();

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            submit: {},
        };
    }

    componentDidMount() {
        if (this.props.userId !== null && this.props.userId !== undefined) {
            this.props.FetchUser(this.props.userId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedUser !== prevProps.selectedUser) {
            this.setState({
                user: { ...this.props.selectedUser } ?? {},
            });

            if (prevProps.selectedUser && this.props.selectedUser) {
                const action = this.props.userId ? "updated" : "created";
                toast.success(`User ${this.props.selectedUser.full_name} ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    }

    handleInputChange = (event) => {
        let user = this.state.user;
        let submit = this.state.submit;
        let checkbox = event.target.type === "checkbox";
        user[event.target.name] = checkbox ? event.target.checked : event.target.value;
        submit[event.target.name] = user[event.target.name];
        this.setState({ user, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;
        const { userId, selectedUser } = this.props;
        const submit_keys = Object.keys(submit);

        if (userId) {
            if (submit_keys.length && !submit_keys.every((key) => selectedUser[key] === submit[key])) {
                this.props.UpdateUser(submit);
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            if (["email", "type", "password"].every((key) => submit.hasOwnProperty(key) && submit[key])) {
                this.props.CreateUser(submit);
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
                    {/* <input type="text" name="profile_picture" value={this.state.user.profile_picture??""} onChange={this.handleInputChange}></input> */}
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
    errorMessage: state.user.errorMessage,
});

export default withStyles(styles)(connect(mapStateToProps, { FetchUser, CreateUser, UpdateUser })(UserModal));
