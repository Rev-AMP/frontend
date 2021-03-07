import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { Divider, TextField, Typography, withStyles } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import PopupModal from "components/PopupModal";
import Button from "components/Button";
import { FetchYear, CreateYear, UpdateYear } from "redux/year/action";
import SchoolSelect from "pages/schools/components/SchoolSelect";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class YearModal extends React.Component {
    constructor(props) {
        super(props);

        const currentYear = new Date().getFullYear();
        this.state = {
            year: {
                start_year: currentYear,
                end_year: currentYear,
            },
            submit: {},
            errors: {
                name: "",
                start_year: "",
                end_year: "",
            },
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.yearId) {
            this.props.FetchYear(this.props.yearId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedYear !== prevProps.selectedYear) {
            const currentYear = new Date().getFullYear();
            this.setState({
                year: { ...this.props.selectedYear } ?? { start_year: currentYear, end_year: currentYear },
            });

            if (this.state.formSubmitted) {
                toast.success(
                    `${this.props.selectedYear.name} ${this.props.yearId ? "updated" : "created"} successfully 🙌`,
                    {
                        position: toast.POSITION.TOP_CENTER,
                    }
                );
                this.props.onClose();
            }
        }
    }

    handleInputChangeDate = (name) => (date) => {
        let { submit, year, errors } = this.state;

        year[name] = date.getFullYear();

        // validate input
        const currentYear = new Date().getFullYear();
        if (name === "start_year") {
            if (year.start_year < currentYear - 1) {
                errors.start_year = "You can't work so much in the past!";
            } else if (year.start_year > currentYear + 1) {
                errors.start_year = "You can't work so much in the future!";
            } else {
                errors.start_year = "";
            }
        } else if (name === "end_year" && year.end_year < currentYear - 1) {
            errors.end_year = "You can't work so much in the future!";
        } else {
            errors.end_year = "";
        }
        if (year.start_year && year.end_year && year.end_year < year.start_year) {
            errors.end_year = "You cannot end the year before you start";
        }

        // update value in submit if it is valid
        if (!errors[name]) {
            submit[name] = date.getFullYear();
        }
        this.setState({ year, submit });
    };

    validateInput = (event) => {
        event.preventDefault();

        let { errors } = this.state;
        const { name, value } = event.target;

        if (name === "name") {
            errors.name = value ? "" : "Name cannot be empty";
        }
        this.setState({ errors });
    };

    handleInputChange = (event) => {
        event.preventDefault();
        let { year, submit, errors } = this.state;
        let { name, value } = event.target;

        // validate input
        this.validateInput(event);
        //update submit if it is valid
        if (!errors[name]) {
            submit[name] = value;
        }

        year[name] = value;
        this.setState({ year, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit, errors, year } = this.state;

        //make sure there are no errors
        if (errors.name || errors.end_year || errors.start_year) return;

        // In case submit values are null i.e. user hasn't changed from the defaults, use whatever is currently set in year
        submit.start_year = submit.start_year ?? year.start_year;
        submit.end_year = submit.end_year ?? year.end_year;

        const { yearId, selectedYear } = this.props;
        const submit_keys = Object.keys(submit);

        if (yearId) {
            if (submit_keys.length && !submit_keys.every((key) => selectedYear[key] === submit[key])) {
                this.props.UpdateYear(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            if (submit.name && submit.school_id && submit.start_year && submit.end_year) {
                this.props.CreateYear(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Empty Fields 💔", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    render() {
        const { classes, yearId, isLoading, isOpen, onClose } = this.props;
        const { errors, year } = this.state;
        const action = yearId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Year
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        name="name"
                        label="Name"
                        value={year.name ?? ""}
                        required
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            name="start_year"
                            label="Start Year"
                            value={new Date().setFullYear(year.start_year)}
                            required
                            variant="inline"
                            views={["year"]}
                            minDate={new Date().setFullYear(new Date().getFullYear() - 1)}
                            maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
                            error={!!errors.start_year}
                            helperText={errors.start_year}
                            onChange={this.handleInputChangeDate("start_year")}
                        />
                        <DatePicker
                            name="end_year"
                            label="End Year"
                            value={new Date().setFullYear(year.end_year)}
                            required
                            variant="inline"
                            views={["year"]}
                            minDate={new Date().setFullYear(year.start_year)}
                            error={!!errors.end_year}
                            helperText={errors.end_year}
                            onChange={this.handleInputChangeDate("end_year")}
                        />
                    </MuiPickersUtilsProvider>
                    <SchoolSelect
                        name="school_id"
                        label="School"
                        value={year.school_id ?? ""}
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
    selectedYear: state.year.selectedYear,
    isLoading: state.year.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { FetchYear, CreateYear, UpdateYear })(YearModal));
