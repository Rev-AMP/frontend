import React from "react";
import { connect } from "react-redux";

import { fetchTerms } from "redux/term/action";
import DataSelect from "components/DataSelect";

class TermSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meow: [],
        };
    }

    componentDidMount() {
        this.props.fetchTerms();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.terms !== prevProps.terms && this.props.terms) {
            let meow = this.state.meow;
            this.props.terms.forEach((term, index) => {
                term.name += ` : ${term.year.school.name}`;
                meow.push(term);
            });
            this.setState({ meow });
        }
    }

    render() {
        const { isLoading, terms, ...otherProps } = this.props;
        return <DataSelect isLoading={isLoading} data={this.state.meow} {...otherProps} />;
    }
}

const mapStateToProps = (state) => ({
    terms: state.term.terms,
    isLoading: state.term.isLoading,
});

export default connect(mapStateToProps, { fetchTerms })(TermSelect);
