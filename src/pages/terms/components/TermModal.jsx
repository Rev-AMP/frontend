import React from "react";
import { connect } from "react-redux";
import { Divider, FormControlLabel, Switch, TextField, Typography, withStyles } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { fetchTerm, updateTerm, createTerm } from "redux/term/action";
import { toast } from "react-toastify";
import PopupModal from "components/PopupModal";
import Button from "components/Button";
import YearSelect from "pages/years/components/YearSelect";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class TermModal extends React.Component {
    constructor(props) {
        super(props);

        const currentDate = new Date();
        this.state = {
            term: {
                start_date: currentDate,
                end_date: currentDate,
                has_electives: false,
            },
            submit: {},
            errors: {
                name: "",
                start_date: "",
                end_date: "",
                current_year_term: "",
            },
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.termId) {
            this.props.fetchTerm(this.props.termId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedTerm !== prevProps.selectedTerm) {
            const currentDate = new Date();
            const { selectedTerm, termId } = this.props;

            let term = { ...selectedTerm } ?? {};
            term.start_date = term.start_date ? new Date(term.start_date) : currentDate;
            term.end_date = term.end_date ? new Date(term.end_date) : currentDate;
            this.setState({ term });

            if (this.state.formSubmitted) {
                toast.success(`${selectedTerm.name} ${termId ? "updated" : "created"} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                this.props.onClose();
            }
        }
    }

    handleInputChangeDate = (name) => (date) => {
        let { submit, term, errors } = this.state;

        term[name] = date;

        // validate input
        if (name === "start_date") {
            errors.start_date = "";
        } else if (name === "end_date") {
            errors.end_date = "";
        }
        if (term.end_date < term.start_date) {
            errors.end_date = "You cannot end the term before you start";
        } else {
            errors.end_date = errors.end_date === "You cannot end the term before you start" ? "" : errors.end_date;
        }
        // update value in submit if it is valid
        if (!errors[name]) {
            submit[name] = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0];
        }

        this.setState({ term, submit, errors });
    };

    validateInput = (event) => {
        const { errors } = this.state;
        const { name, value } = event.target;

        switch (name) {
            case "name":
                errors.name = value ? "" : "Name cannot be empty";
                break;

            case "current_year_term":
                if (!value) {
                    errors.current_year_term = "Current Year Term cannot be empty";
                } else if (value < 1) {
                    errors.current_year_term = "Current Year Term cannot be less than 1";
                } else {
                    errors.current_year_term = "";
                }
                break;

            default:
                break;
        }

        this.setState({ errors });
    };

    handleInputChange = (event) => {
        let { term, submit, errors } = this.state;
        let { name, value, type, checked } = event.target;
        value = type === "checkbox" ? checked : value;
        // set value of term regardless of validity
        term[name] = value;
        // validate input
        this.validateInput(event);
        // // update submit if it is valid
        if (!errors[name]) {
            submit[name] = value;
        }

        this.setState({ term, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { term, submit, errors } = this.state;

        // make sure there are no errors
        if (errors.name || errors.start_date || errors.end_date || errors.current_year_term) return;

        const { termId, selectedTerm } = this.props;
        const submitKeys = Object.keys(submit);

        if (termId) {
            if (submitKeys.length && !submitKeys.every((key) => selectedTerm[key] === submit[key])) {
                this.props.updateTerm(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            // set dates from fields
            submit.start_date =
                submit.start_date ??
                new Date(term.start_date.getTime() - term.start_date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split("T")[0];
            submit.end_date =
                submit.end_date ??
                new Date(term.end_date.getTime() - term.end_date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split("T")[0];

            // set value of required toggle switch from field
            submit.has_electives = submit.has_electives !== undefined ? submit.has_electives : event.target[5].checked;

            if (submit.name && submit.year_id && submit.has_electives !== undefined) {
                this.props.createTerm(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Empty Fields 💔", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    render() {
        const { isLoading, isOpen, onClose, termId, classes } = this.props;
        const { errors, term } = this.state;
        const action = termId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Term
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                        name="name"
                        label="Name"
                        value={term.name ?? ""}
                        required
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <YearSelect
                        name="year_id"
                        label="Year"
                        value={term.year_id ?? ""}
                        onChange={this.handleInputChange}
                        required
                    />
                    <TextField
                        name="current_year_term"
                        label="Current Year Term"
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        value={term.current_year_term ?? ""}
                        required
                        onBlur={this.validateInput}
                        onChange={this.handleInputChange}
                        error={!!errors.current_year_term}
                        helperText={errors.current_year_term}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            name="start_date"
                            label="Start Date"
                            value={new Date(term.start_date)}
                            required
                            error={!!errors.start_date}
                            helperText={errors.start_date}
                            onChange={this.handleInputChangeDate("start_date")}
                        />
                        <DatePicker
                            name="end_date"
                            label="End Date"
                            value={new Date(term.end_date)}
                            minDate={new Date(term.start_date)}
                            error={!!errors.end_date}
                            helperText={errors.end_date}
                            onChange={this.handleInputChangeDate("end_date")}
                        />
                    </MuiPickersUtilsProvider>

                    <FormControlLabel
                        control={
                            <Switch
                                name="has_electives"
                                checked={term.has_electives}
                                onChange={this.handleInputChange}
                                color="primary"
                                // onClick={(e) => console.log(e)}
                            />
                        }
                        label="Has Electives"
                        className={classes.centerItem}
                    />
                    {termId && (
                        <FormControlLabel
                            control={
                                <Switch
                                    name="is_active"
                                    checked={term.is_active ?? false}
                                    onChange={this.handleInputChange}
                                    color="primary"
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
    selectedTerm: state.term.selectedTerm,
    isLoading: state.term.isLoading,
});

export default withStyles(styles)(connect(mapStateToProps, { fetchTerm, updateTerm, createTerm })(TermModal));
