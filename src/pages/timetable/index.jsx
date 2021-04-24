import React from "react";
import TimetableCard from "./components/TimetableCard";
import { connect } from "react-redux";

import { fetchTimetable } from "redux/timetable/action";

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
        return <TimetableCard day="Tuesday" />;
    }
}

const mapStateToProps = (state) => ({
    timetable: state.timetable.timetable,
});

export default connect(mapStateToProps, { fetchTimetable })(Timetable);
