import React from "react";
import { TextField, Typography, Divider, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchDivision, createDivision, updateDivision } from "redux/division/action";
import { getUpdatedInfo } from "services/get-updated-info";
import { toast } from "react-toastify";

import PopupModal from "components/PopupModal";
import CourseSelect from "pages/courses/components/CourseSelect";
import ProfessorSelect from "pages/users/components/ProfessorSelect";
import Button from "components/Button";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class DivisionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            division: {},
            submit: {},
            errors: {
                division_code: "",
                number_of_batches: "",
            },
            formSubmitted: false,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedDivision !== prevProps.selectedDivision) {
            const { selectedDivision, divisionId } = this.props;

            let division = { ...selectedDivision } ?? {};
            this.setState({ division }, () => console.log(this.state));

            if (this.state.formSubmitted) {
                toast.success(
                    `Division with code: ${selectedDivision.division_code} ${
                        divisionId ? "updated" : "created"
                    } successfully 🙌`,
                    {
                        position: toast.POSITION.TOP_CENTER,
                    }
                );
                this.props.onClose();
            }
        }
    }

    componentDidMount() {
        if (this.props.divisionId) {
            this.props.fetchDivision(this.props.divisionId);
        }
    }

    validateInput = (event) => {
        const { errors } = this.state;
        const { name, value } = event.target;

        switch (name) {
            case "division_code":
                errors.division_code = value ? "" : "Division Code cannot be empty";
                break;

            case "number_of_batches":
                errors.number_of_batches = value > 0 ? "" : "Number of batches should be greater than 0";
                break;

            default:
                break;
        }

        this.setState({ errors });
    };

    handleInputChange = (event) => {
        let { division, submit, errors } = this.state;
        let { name, value } = event.target;
        // set value of division regardless of validity
        division[name] = value;
        // validate input
        this.validateInput(event);
        // update submit if it is valid
        if (!errors[name]) {
            submit[name] = value;
        }

        this.setState({ division, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit, errors } = this.state;

        // make sure there are no errors
        if (errors.division_code || errors.number_of_batches) {
            toast.error("Empty Fields 💔", {
                position: toast.POSITION.TOP_CENTER,
            });
            return;
        }
        const { divisionId, selectedDivision } = this.props;

        if (divisionId) {
            const updatedInfo = getUpdatedInfo(selectedDivision, submit);
            if (Object.keys(updatedInfo).length) {
                this.props.updateDivision(updatedInfo);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            this.props.createDivision(submit);
            this.setState({ formSubmitted: true });
        }
    };

    render() {
        const { isLoading, isOpen, onClose, divisionId, classes } = this.props;
        const { division, errors } = this.state;
        const action = divisionId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Division
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                        name="division_code"
                        label="Division Code"
                        type="number"
                        value={division.division_code ?? ""}
                        required
                        onChange={this.handleInputChange}
                        error={!!errors.division_code}
                        helperText={errors.division_code}
                    />
                    <TextField
                        name="number_of_batches"
                        label="Number of Batches"
                        type="number"
                        value={division.number_of_batches ?? ""}
                        required
                        onChange={this.handleInputChange}
                        error={!!errors.number_of_batches}
                        helperText={errors.number_of_batches}
                    />
                    <CourseSelect
                        name="course_id"
                        label="Course"
                        value={division.course_id ?? ""}
                        onChange={this.handleInputChange}
                        required
                    />
                    <ProfessorSelect
                        name="professor_id"
                        label="Professor"
                        value={division.professor_id ?? ""}
                        onChange={this.handleInputChange}
                        required
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
    isLoading: state.division.isLoading,
    selectedDivision: state.division.selectedDivision,
});

export default withStyles(styles)(
    connect(mapStateToProps, { fetchDivision, createDivision, updateDivision })(DivisionModal)
);
