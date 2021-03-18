import React from "react";
import { connect } from "react-redux";

import { fetchSchools } from "redux/school/action";
import DataSelect from "components/DataSelect";

class SchoolSelect extends React.Component {
    componentDidMount() {
        this.props.fetchSchools();
    }

    render() {
        const { schools, isLoading, fetchSchools, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={schools} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    schools: state.school.schools,
    isLoading: state.school.isLoading,
});

export default connect(mapStateToProps, { fetchSchools })(SchoolSelect);
