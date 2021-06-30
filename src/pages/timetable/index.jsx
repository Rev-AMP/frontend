import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import { fetchTimetable } from "redux/timetable/action";

import TimetableCard from "./components/TimetableCard";

const useStyles = (theme) => ({
    flexContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        order: 3,
    },
});

class Timetable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentId: "",
        };
    }

    componentDidMount() {
        this.props.fetchTimetable(this.state.studentId);
    }

    render() {
        const { timetable, classes } = this.props;
        return (
            <div className={classes.flexContainer}>
                {timetable &&
                    Object.keys(timetable).map((key) => (
                        <TimetableCard day={key.charAt(0).toUpperCase() + key.slice(1)} lectures={timetable[key]} />
                    ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    timetable: state.timetable.timetable,
});

export default withStyles(useStyles)(connect(mapStateToProps, { fetchTimetable })(Timetable));
