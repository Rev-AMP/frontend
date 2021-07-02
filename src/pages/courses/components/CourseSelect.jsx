import React from "react";
import { connect } from "react-redux";

import { fetchCourses } from "redux/course/action";
import DataSelect from "components/DataSelect";

class CourseSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meow: [],
        };
    }

    componentDidMount() {
        this.props.fetchCourses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.courses !== prevProps.courses && this.props.courses) {
            let meow = this.state.meow;
            this.props.courses.forEach((course, index) => {
                course.name += ` : ${course.term.name} : ${course.term.year.school.name}`;
                meow.push(course);
            });
            this.setState({ meow });
        }
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
