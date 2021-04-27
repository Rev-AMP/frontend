import React from "react";
import { connect } from "react-redux";

import { fetchDivisions } from "redux/divisions/action";

class DivisionPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDivisions();
    }

    render() {
        return <p>Division Page</p>;
    }
}

const mapStateToProps = (state) => ({
    divisions: state.division.divisions,
    isLoading: state.division.isLoading,
})

export default connect(mapStateToProps, { fetchDivisions })(DivisionPage);
