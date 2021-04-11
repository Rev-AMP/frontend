import React from "react";
import { connect } from "react-redux";
import { fetchStudentsForTerm } from "redux/term/action";

class TermDetails extends React.Component {
    componentDidMount() {
        this.props.fetchStudentsForTerm(this.props.match.params.termid);
    }

    render() {
        return <p>Display DataPage for Term ID: {this.props.match.params.termid}</p>;
    }
}

const mapStateToProps = (state) => ({
    studentsForTerm: state.term.studentsForTerm,
    isLoading: state.term.isLoading,
});

export default connect(mapStateToProps, { fetchStudentsForTerm })(TermDetails);
