import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, Typography, withStyles } from "@material-ui/core";

import { createTimeSlot, fetchTimeSlot, updateTimeSlot } from "redux/timeslots/action";
import { getUpdatedInfo } from "services/get-updated-info";
import Button from "components/Button";
import PopupModal from "components/PopupModal";
import SchoolSelect from "../../schools/components/SchoolSelect";
import DateFnsUtils from "@date-io/date-fns";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class TimeSlotModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeslot: {
                start_time_date: undefined,
                end_time_date: undefined,
            },
            submit: {},
            errors: {
                start_time: "",
                end_time: "",
            },
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.timeslotId !== null && this.props.timeslotId) {
            this.props.fetchTimeSlot(this.props.timeslotId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedTimeSlot !== prevProps.selectedTimeSlot) {
            this.setState({
                timeslot: { ...this.props.selectedTimeSlot } ?? {},
            });

            if (this.state.formSubmitted) {
                const action = this.props.timeslotId ? "updated" : "created";
                toast.success(`Time Slot ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                this.props.onClose();
            }
        }
    }

    handleInputChange = (event) => {
        let timeslot = this.state.timeslot;
        let submit = this.state.submit;
        const { name, value } = event.target;

        // update value in submit if it is valid
        submit[name] = value;
        timeslot[name] = value;
        this.setState({ timeslot, submit });
    };

    handleInputChangeDate = (name) => (date) => {
        let { submit, timeslot, errors } = this.state;

        timeslot[name] = `${date.getHours()}:${date.getMinutes()}`;

        // validate input
        if (
            timeslot.start_time &&
            timeslot.end_time &&
            new Date().setHours(Number(timeslot.end_time?.split(":")[0]), Number(timeslot.end_time?.split(":")[1])) <=
                new Date().setHours(
                    Number(timeslot.start_time?.split(":")[0]),
                    Number(timeslot.start_time?.split(":")[1])
                )
        ) {
            errors.end_time = "You cannot end the lecture before you start";
        } else {
            errors.end_time = "";
        }

        // update value in submit if it is valid
        if (!errors[name]) {
            submit[name] = `${date.getHours()}:${date.getMinutes()}`;
        }
        this.setState({ timeslot, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit, errors } = this.state;

        // make sure there are no errors
        if (errors.end_time) return;

        const { timeslotId, selectedTimeSlot } = this.props;

        if (timeslotId) {
            const updatedInfo = getUpdatedInfo(selectedTimeSlot, submit);
            if (Object.keys(updatedInfo).length) {
                this.props.updateTimeSlot(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            this.props.createTimeSlot(submit);
            this.setState({ formSubmitted: true });
        }
    };

    render() {
        const { timeslot, errors } = this.state;
        const { classes, timeslotId, isLoading, isOpen, onClose } = this.props;
        const action = timeslotId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Time Slot
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            name="start_time"
                            label="Start Time"
                            ampm={false}
                            value={new Date().setHours(
                                Number(timeslot.start_time?.split(":")[0]),
                                Number(timeslot.start_time?.split(":")[1])
                            )}
                            required
                            error={!!errors.start_time}
                            helperText={errors.start_time}
                            onChange={this.handleInputChangeDate("start_time")}
                        />
                        <TimePicker
                            name="end_time"
                            label="End Time"
                            ampm={false}
                            value={new Date().setHours(
                                Number(timeslot.end_time?.split(":")[0]),
                                Number(timeslot.end_time?.split(":")[1])
                            )}
                            required
                            error={!!errors.end_time}
                            helperText={errors.end_time}
                            onChange={this.handleInputChangeDate("end_time")}
                        />
                    </MuiPickersUtilsProvider>
                    <SchoolSelect
                        name="school_id"
                        label="School"
                        value={timeslot.school_id ?? ""}
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
    selectedTimeSlot: state.timeslot.selectedTimeSlot,
    isLoading: state.timeslot.isLoading,
});

export default withStyles(styles)(
    connect(mapStateToProps, { fetchTimeSlot, createTimeSlot, updateTimeSlot })(TimeSlotModal)
);
