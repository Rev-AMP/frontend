import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Grid, capitalize, Divider, FormControlLabel, Checkbox, Typography, withStyles } from "@material-ui/core";

import { fetchAdmin, updateAdmin } from "redux/admin/action";
import { getUpdatedInfo } from "services/get-updated-info";
import PopupModal from "components/PopupModal";
import Button from "components/Button";
import { AdminPermissions } from "../../../services/admin";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
});

class AdminModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminPerms: null,
            submit: {},
            formSubmitted: false,
        };
    }

    componentDidMount() {
        this.props.fetchAdmin(this.props.adminId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedAdmin, onClose } = this.props;
        if (selectedAdmin !== prevProps.selectedAdmin && selectedAdmin) {
            this.setState({
                adminPerms: new AdminPermissions(selectedAdmin.permissions.permissions),
            });

            if (this.state.formSubmitted) {
                toast.success(`Permissions for ${selectedAdmin.user.full_name} updated successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                onClose();
            }
        }
    }

    handleInputChange = (event) => {
        const { name, checked } = event.target;
        const { adminPerms, submit } = this.state;

        // update admin object
        adminPerms.set(name, checked);
        console.log(adminPerms);

        // update the permissions numeric value in submit
        submit.permissions = adminPerms.permissions;

        this.setState({ adminPerms, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;
        let selectedAdmin = { ...this.props.selectedAdmin };

        // set permissions to the numeric value instead of AdminPermissions object to check for updated info
        selectedAdmin.permissions = selectedAdmin.permissions.permissions;

        const updatedInfo = getUpdatedInfo(selectedAdmin, submit);
        if (Object.keys(updatedInfo).length) {
            updatedInfo.user_id = selectedAdmin.user_id;
            this.props.updateAdmin(updatedInfo);
            this.setState({ formSubmitted: true });
        } else {
            toast.error("Please update some information 😓", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    render() {
        const { classes, isLoading, isOpen, onClose } = this.props;
        const { adminPerms } = this.state;

        const perms = ["user", "admin", "school", "year", "term", "course", "cbcs"];

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        Update admin
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <Grid container justify="space-between">
                        {perms.map((perm) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={perm}
                                        checked={adminPerms ? adminPerms.isAllowed(perm) : false}
                                        onChange={this.handleInputChange}
                                        color="primary"
                                    />
                                }
                                label={perm === "cbcs" ? perm.toUpperCase() : capitalize(perm)}
                                labelPlacement="top"
                                key={perm}
                            />
                        ))}
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </PopupModal>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedAdmin: state.admin.selectedAdmin,
    isLoading: state.admin.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchAdmin, updateAdmin })(AdminModal));
