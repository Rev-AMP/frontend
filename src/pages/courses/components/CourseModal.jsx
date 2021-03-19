import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, TextField, Typography, withStyles } from "@material-ui/core";

import { fetchCourse, createCourse, updateCourse } from "redux/course/action";
import { getUpdatedInfo } from "services/get-updated-info";
import PopupModal from "components/PopupModal";
import Button from "components/Button";
import TermSelect from "pages/terms/components/TermSelect";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class CourseModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            submit: {},
            errors: {
                name: "",
                code: "",
            },
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.courseId) {
            this.props.fetchCourse(this.props.courseId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { selectedCourse, courseId, onClose } = this.props;
        if (selectedCourse !== prevProps.selectedCourse) {
            this.setState({ course: { ...selectedCourse } ?? {} });

            if (this.state.formSubmitted) {
                const action = courseId ? "updated" : "created";
                toast.success(`${selectedCourse.name} ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                onClose();
            }
        }
    }

    validateInput = (event) => {
        let errors = this.state.errors;
        const { name, value } = event.target;

        switch (name) {
            case "name":
                errors.name = value ? "" : "Course Name cannot be empty";
                break;

            case "code":
                errors.code = value && value.length <= 20 ? "" : "Course Code must be 1-20 characters long";
                break;

            default:
                break;
        }

        this.setState({ errors });
    };

    handleInputChange = (event) => {
        let { course, submit } = this.state;
        const { name, value } = event.target;

        course[name] = value;

        // validate new input value
        this.validateInput(event);
        // update value in submit if it is valid
        if (!this.state.errors[name]) {
            submit[name] = value;
        }

        this.setState({ course, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit, errors } = this.state;

        // make sure there are no errors
        if (errors.name || errors.code) return;

        const { courseId, selectedCourse } = this.props;

        if (courseId) {
            const updatedInfo = getUpdatedInfo(selectedCourse, submit);
            if (Object.keys(updatedInfo).length) {
                this.props.updateCourse(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            if (submit.name && submit.code && submit.term_id) {
                this.props.createCourse(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please add Course name, Course Code and Term 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    render() {
        const { classes, courseId, isLoading, isOpen, onClose } = this.props;
        const { course, errors } = this.state;
        const action = courseId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Course
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        name="name"
                        label="Name"
                        value={course.name ?? ""}
                        required={true}
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        name="code"
                        label="Code"
                        value={course.code ?? ""}
                        required
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.code}
                        helperText={errors.code}
                    />
                    <TermSelect
                        name="term_id"
                        label="Term"
                        value={course.term_id ?? ""}
                        required
                        onChange={this.handleInputChange}
                        error={!!errors.term_id}
                        helperText={errors.term_id}
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
    selectedCourse: state.course.selectedCourse,
    isLoading: state.course.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchCourse, createCourse, updateCourse })(CourseModal));
