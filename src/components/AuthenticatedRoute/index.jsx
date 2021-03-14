import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "components/Loader";
import { fetchUserMe } from "redux/user/action";

class AuthenticatedRoute extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.rehydrated && this.props.isLoggedIn && !this.props.currentUser) {
            this.props.fetchUserMe();
        }
    }

    render() {
        if (!this.props.rehydrated) {
            return <Loader />;
        } else if (this.props.isLoggedIn) {
            if (this.props.currentUser) {
                return <Route {...this.props} />;
            }
            return <Loader />;
        }
        return <Redirect to="/login" />;
    }
}

const mapStateToProps = (state) => ({
    rehydrated: state._persist.rehydrated,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { fetchUserMe })(AuthenticatedRoute);
