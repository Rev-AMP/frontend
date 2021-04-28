import React from "react";
import { TextField, Typography, Divider, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchDivision } from "redux/divisions/action";
import { toast } from "react-toastify";

import PopupModal from "components/PopupModal";

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

            default:
                break;
        }

        this.setState({ errors });
    };

    handleInputChange = (event) => {
        let { division, submit, errors } = this.state;
        let { name, value } = event.target;
        // set value of term regardless of validity
        division[name] = value;
        // validate input
        this.validateInput(event);
        // update submit if it is valid
        if (!errors[name]) {
            submit[name] = value;
        }

        this.setState({ division, submit });
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
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.division_code}
                        helperText={errors.division_code}
                    />
                </form>
            </PopupModal>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.division.isLoading,
    selectedDivision: state.division.selectedDivision,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchDivision })(DivisionModal));
