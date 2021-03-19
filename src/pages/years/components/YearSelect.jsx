import React from "react";
import { connect } from "react-redux";

import { fetchYears } from "redux/year/action";
import DataSelect from "components/DataSelect";

class YearSelect extends React.Component {
    componentDidMount() {
        this.props.fetchYears();
    }

    render() {
        const { isLoading, years, fetchYears, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={years} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    years: state.year.years,
    isLoading: state.year.isLoading,
});

export default connect(mapStateToProps, { fetchYears })(YearSelect);
