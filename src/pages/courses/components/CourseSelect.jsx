import React from "react";
import { connect } from "react-redux";

import { fetchCourses } from "redux/course/action";
import DataSelect from "components/DataSelect";

class CourseSelect extends React.Component {
    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        const { isLoading, courses, fetchCourses, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={courses} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    courses: state.course.courses,
    isLoading: state.course.isLoading,
});

export default connect(mapStateToProps, { fetchCourses })(CourseSelect);
