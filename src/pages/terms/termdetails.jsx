import React from "react";

class TermDetails extends React.Component {
    render() {
        const { match } = this.props;

        return <p>Display DataPage for Term ID: {match.params.termid}</p>;
    }
}

export default TermDetails;
