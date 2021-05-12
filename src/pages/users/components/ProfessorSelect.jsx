import React from "react";
import { connect } from "react-redux";

import { fetchProfessors } from "redux/user/action";
import DataSelect from "components/DataSelect";

class ProfessorSelect extends React.Component {
    componentDidMount() {
        this.props.fetchProfessors();
    }

    render() {
        const { isLoading, professors, fetchProfessors, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={professors} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    professors: state.user.professors,
    isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, { fetchProfessors })(ProfessorSelect);
