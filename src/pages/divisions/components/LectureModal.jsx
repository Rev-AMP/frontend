import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Divider, MenuItem, TextField, Typography, withStyles } from "@material-ui/core";

import { createLecture, fetchLecture, updateLecture } from "redux/timetable/action";
import { getUpdatedInfo } from "services/get-updated-info";
import Button from "components/Button";
import PopupModal from "components/PopupModal";
import TimeSlotSelect from "../../timeslots/components/TimeSlotSelect";

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
    },
    centerItem: theme.styles.centerItem,
});

class LectureModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lecture: {
                division_id: this.props.divisionId,
            },
            submit: {
                division_id: this.props.divisionId,
            },
            formSubmitted: false,
        };
    }

    componentDidMount() {
        if (this.props.lectureId !== null && this.props.lectureId) {
            this.props.fetchLecture(this.props.lectureId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedLecture !== prevProps.selectedLecture) {
            this.setState({
                lecture: { ...this.props.selectedLecture } ?? {},
            });

            if (this.state.formSubmitted) {
                const action = this.props.lectureId ? "updated" : "created";
                toast.success(`Lecture ${action} successfully 🙌`, {
                    position: toast.POSITION.TOP_CENTER,
                });
                this.props.onClose();
            }
        }
    }

    handleInputChange = (event) => {
        let lecture = this.state.lecture;
        let submit = this.state.submit;
        const { name, value } = event.target;

        // update value in submit and lecture
        submit[name] = value;
        lecture[name] = value;

        this.setState({ lecture, submit });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { submit } = this.state;

        const { lectureId, selectedLecture } = this.props;

        if (lectureId) {
            const updatedInfo = getUpdatedInfo(selectedLecture, submit);
            if (Object.keys(updatedInfo).length) {
                this.props.updateLecture(submit);
                this.setState({ formSubmitted: true });
            } else {
                toast.error("Please update some information 😓", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } else {
            this.props.createLecture(submit);
            this.setState({ formSubmitted: true });
        }
    };

    render() {
        const { classes, lectureId, isLoading, isOpen, onClose } = this.props;
        const { lecture } = this.state;
        const action = lectureId ? "Update" : "Create";

        return (
            <PopupModal isLoading={isLoading} isOpen={isOpen} onClose={onClose}>
                <div style={{ textAlign: "center" }}>
                    <Typography color="primary" variant="h3">
                        {action} Lecture
                    </Typography>
                </div>

                <Divider style={{ marginBottom: "1rem" }} />

                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <TextField
                        select
                        name="day"
                        label="Day"
                        value={lecture.day ?? ""}
                        onChange={this.handleInputChange}
                        required
                    >
                        <MenuItem value="Monday">Monday</MenuItem>
                        <MenuItem value="Tuesday">Tuesday</MenuItem>
                        <MenuItem value="Wednesday">Wednesday</MenuItem>
                        <MenuItem value="Thursday">Thursday</MenuItem>
                        <MenuItem value="Friday">Friday</MenuItem>
                        <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimeSlotSelect
                        name="time_slot_id"
                        label="Time Slot"
                        value={lecture.time_slot_id ?? ""}
                        onChange={this.handleInputChange}
                        schoolId={this.props.division.course.term.year.school.id}
                        required
                    />
                    <TextField
                        select
                        name="type"
                        label="Lecture Type"
                        value={lecture.type ?? ""}
                        onChange={this.handleInputChange}
                        required
                    >
                        <MenuItem value="theory">Theory</MenuItem>
                        <MenuItem value="practical">Practical</MenuItem>
                        <MenuItem value="tutorial">Tutorial</MenuItem>
                    </TextField>
                    <TextField
                        name="room_number"
                        label="Room Number"
                        value={lecture.room_number ?? ""}
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
    selectedLecture: state.timetable.lecture,
    isLoading: state.timetable.isLoading,
    division: state.division.selectedDivision,
});

export default withStyles(styles)(
    connect(mapStateToProps, { fetchLecture, createLecture, updateLecture })(LectureModal)
);
