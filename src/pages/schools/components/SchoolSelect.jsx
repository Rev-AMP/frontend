import React from "react";
import { LinearProgress, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { fetchSchools } from "redux/school/action";

class SchoolSelect extends React.Component {
    componentDidMount() {
        this.props.fetchSchools();
    }

    render() {
        //     let otherProps = { ...this.props };
        //     delete otherProps["schools"];
        const { schools, isLoading, fetchSchools, ...otherProps } = this.props;

        if (isLoading) {
            return <LinearProgress />;
        }

        return (
            <TextField select {...otherProps}>
                {schools.map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                        {school.name}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

const mapStateToProps = (state) => ({
    schools: state.school.schools,
    isLoading: state.school.isLoading,
});

export default connect(mapStateToProps, { fetchSchools })(SchoolSelect);
