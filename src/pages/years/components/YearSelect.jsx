import React from "react";
import { LinearProgress, MenuItem, TextField } from "@material-ui/core";
import { connect } from "react-redux";

import { fetchYears } from "redux/year/action";
class YearSelect extends React.Component {
    componentDidMount() {
        this.props.fetchYears();
    }

    render() {
        const { isLoading, years, ...otherProps } = this.props;

        if (isLoading) {
            return <LinearProgress />;
        }

        return (
            <TextField select {...otherProps}>
                {years.map((year) => (
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

export default connect(mapStateToProps, { fetchYears })(YearSelect);
