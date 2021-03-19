import React from "react";
import { connect } from "react-redux";

import { fetchTerms } from "redux/term/action";
import DataSelect from "components/DataSelect";

class TermSelect extends React.Component {
    componentDidMount() {
        this.props.fetchTerms();
    }

    render() {
        const { isLoading, terms, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={terms} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    terms: state.term.terms,
    isLoading: state.term.isLoading,
});

export default connect(mapStateToProps, { fetchTerms })(TermSelect);
