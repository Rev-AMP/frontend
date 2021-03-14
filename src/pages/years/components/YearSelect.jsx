import React from "react";
import { LinearProgress, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { FetchYears } from "redux/year/action";

class YearSelect extends React.Component {
    componentDidMount() {
        this.props.FetchYears();
    }

    render() {
        let otherProps = { ...this.props };
        delete otherProps["years"];

        if (this.props.isLoading) {
            return <LinearProgress />;
        }

        return (
            <TextField select {...otherProps}>
                {this.props.years.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
                        {year.name}
                    </MenuItem>
                ))}
            </TextField>
        );
    }
}

const mapStateToProps = (state) => ({
    years: state.year.years,
    isLoading: state.year.isLoading,
});

export default connect(mapStateToProps, { FetchYears })(YearSelect);
