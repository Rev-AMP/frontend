import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class AuthenticatedRoute extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            return (<Route {...this.props} />);
        }
        return (<Redirect to="/login" />);
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(AuthenticatedRoute);