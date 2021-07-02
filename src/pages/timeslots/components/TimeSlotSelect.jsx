import React from "react";
import { connect } from "react-redux";

import { fetchSchoolTimeSlots } from "redux/school/action";
import DataSelect from "components/DataSelect";

class TimeSlotSelect extends React.Component {
    componentDidMount() {
        this.props.fetchSchoolTimeSlots(this.props.schoolId);
    }

    render() {
        const { timeslots, isLoading, fetchSchools, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={timeslots} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    timeslots: state.school.timeslots,
    isLoading: state.school.isLoading,
});

export default connect(mapStateToProps, { fetchSchoolTimeSlots })(TimeSlotSelect);
