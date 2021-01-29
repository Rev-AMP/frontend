import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, TextField, Typography, withStyles } from "@material-ui/core";

import { CreateSchool, FetchSchool, UpdateSchool } from "redux/school/action";
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

class SchoolModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            school: {},
            submit: {},
        };
    }

    componentDidMount() {
        if (this.props.schoolId !== null && this.props.schoolId) {
            this.props.FetchSchool(this.props.schoolId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedSchool !== prevProps.selectedSchool) {
            this.setState({
                school: { ...this.props.selectedSchool } ?? {},
            });

            if (prevProps.selectedSchool && this.props.selectedSchool) {
                const action = this.props.schoolId ? "updated" : "created";
                toast.success(`School ${this.props.selectedSchool.full_name} ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    }

    handleInputChange = (event) => {
        let school = this.state.school;
        let submit = this.state.submit;
        school[event.target.name] = submit[event.target.name] = event.target.value;
        this.setState({ school, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;
        const { schoolId, selectedSchool } = this.props;
        const submit_keys = Object.keys(submit);

        if (schoolId) {
            if (submit_keys.length && !submit_keys.every((key) => selectedSchool[key] === submit[key])) {
                this.props.UpdateSchool(submit);
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            if (submit.hasOwnProperty("name") && submit["name"]) {
                this.props.CreateSchool(submit);
            } else {
                toast.error("Please add email, type and password 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    render() {
        const { classes, schoolId, isLoading, isOpen, onClose } = this.props;
        const action = schoolId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} School
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        name="name"
                        label="Name"
                        value={this.state.school.name ?? ""}
                        required={!schoolId}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name="head"
                        label="Head"
                        value={this.state.school.head ?? ""}
                        onChange={this.handleInputChange}
                    />
                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </PopupModal>
        );
    }
}

const mapStateToProps = (state) => ({
    selectedSchool: state.school.selectedSchool,
    isLoading: state.school.isLoading,
    errorMessage: state.school.errorMessage,
});

export default withStyles(styles)(connect(mapStateToProps, { FetchSchool, CreateSchool, UpdateSchool })(SchoolModal));
