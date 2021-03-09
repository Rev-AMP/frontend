import React from "react";
import { LinearProgress, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { FetchSchools } from "redux/school/action";

class SchoolSelect extends React.Component {
    componentDidMount() {
        this.props.FetchSchools();
    }

    render() {
        let otherProps = { ...this.props };
        delete otherProps["schools"];

        if (this.props.isLoading) {
            return <LinearProgress />;
        }

        return (
            <TextField select {...otherProps}>
                {this.props.schools.map((school) => (
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

export default connect(mapStateToProps, { FetchSchools })(SchoolSelect);
