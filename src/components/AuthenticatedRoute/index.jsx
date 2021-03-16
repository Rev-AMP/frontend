import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import Loader from "components/Loader";
import { fetchUserMe } from "redux/user/action";
import { fetchAdminMe, adminPermissionFailure } from "redux/admin/action";

class AuthenticatedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userFetched: false,
        };
    }

    componentDidMount() {
        const { rehydrated, permission, currentUser, currentAdmin, fetchAdminMe, adminPermissionFailure } = this.props;
        if (rehydrated && permission && currentUser) {
            if (currentUser.is_admin) {
                if (!currentAdmin) {
                    fetchAdminMe();
                } else if (!currentAdmin.permissions.isAllowed(permission)) {
                    adminPermissionFailure(permission);
                }
            } else {
                adminPermissionFailure(permission);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            rehydrated,
            isLoggedIn,
            currentUser,
            fetchUserMe,
            permission,
            currentAdmin,
            adminPermissionFailure,
            fetchAdminMe,
        } = this.props;
        const { userFetched } = this.state;
        if (rehydrated) {
            if (isLoggedIn && !currentUser && !userFetched) {
                fetchUserMe();
                this.setState({ userFetched: true });
            }
            if (permission && currentUser) {
                if (currentUser.is_admin) {
                    if (!currentAdmin) {
                        fetchAdminMe();
                    } else if (!currentAdmin.permissions.isAllowed(permission)) {
                        adminPermissionFailure(permission);
                    }
                } else {
                    adminPermissionFailure(permission);
                }
            }
        }
    }

    render() {
        const { rehydrated, permission, currentAdmin, isLoggedIn, currentUser, isLoading, ...otherProps } = this.props;

        if (!rehydrated || isLoading) {
            return <Loader />;
        } else if (isLoggedIn) {
            if (currentUser) {
                if (permission) {
                    if (currentUser.is_admin && currentAdmin && currentAdmin.permissions.isAllowed(permission)) {
                        return <Route {...otherProps} />;
                    }
                    return <Redirect to="/app" />;
                }
                return <Route {...otherProps} />;
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
    currentAdmin: state.admin.currentAdmin,
    isLoading: state.auth.isLoading || state.user.isLoading || state.admin.isLoading,
});

export default connect(mapStateToProps, { fetchUserMe, fetchAdminMe, adminPermissionFailure })(AuthenticatedRoute);
