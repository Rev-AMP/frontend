import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Loader from "components/Loader";
import { fetchUserMe } from "redux/user/action";
import { fetchAdminMe } from "redux/admin/action";

class AuthenticatedRoute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userFetched: false,
            adminFetched: false,
        };
    }

    checkPerms = () => {
        const { permission, currentUser, currentAdmin, fetchAdminMe } = this.props;
        const { adminFetched } = this.state;
        if (permission && currentUser) {
            if (currentUser.is_admin) {
                if (!currentAdmin) {
                    if (!adminFetched) {
                        fetchAdminMe();
                        this.setState({ adminFetched: true });
                    }
                } else if (!currentAdmin.permissions.isAllowed(permission)) {
                    toast.error(`Error 😓: You don't have ${permission} permissions`, {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            } else {
                toast.error(`Error 😓: You don't have ${permission} permissions`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        }
    };

    componentDidMount() {
        if (this.props.rehydrated) {
            this.checkPerms();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { rehydrated, isLoggedIn, currentUser, fetchUserMe } = this.props;
        const { userFetched } = this.state;
        if (rehydrated) {
            if (isLoggedIn && !currentUser && !userFetched) {
                fetchUserMe();
                this.setState({ userFetched: true });
            }
            this.checkPerms();
        }
    }

    render() {
        const { rehydrated, permission, currentAdmin, isLoggedIn, currentUser, isLoading, ...otherProps } = this.props;

        if (
            !rehydrated ||
            (isLoggedIn && !currentUser) ||
            (permission && currentUser && currentUser.is_admin && !currentAdmin)
        ) {
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

function AuthenticateRoute(props) {
    const {
        rehydrated,
        isLoggedIn,
        currentUser,
        currentAdmin,
        fetchUserMe,
        permission,
        fetchAdminMe,
        ...otherProps
    } = props;
    const selfDataLoading = isLoggedIn && !currentUser;

    useEffect(() => {
        if (rehydrated && selfDataLoading) {
            fetchUserMe();
        }
    }, [rehydrated, selfDataLoading, fetchUserMe]);

    useEffect(() => {
        if (currentUser && currentUser.is_admin && permission && !currentAdmin) {
            fetchAdminMe();
        }
        if (
            permission &&
            ((currentUser && !currentUser.is_admin) ||
                (currentAdmin && !currentAdmin.permissions.isAllowed(permission)))
        ) {
            toast.error(`Error 😓: You don't have ${permission} permissions`, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }, [currentUser, permission, currentAdmin, fetchAdminMe]);

    if (!rehydrated || selfDataLoading || (permission && currentUser.is_admin && !currentAdmin)) {
        return <Loader />;
    } else if (currentUser) {
        if (permission) {
            if (currentUser.is_admin && currentAdmin.permissions.isAllowed(permission)) {
                return <Route {...otherProps} />;
            }
            return <Redirect to="/app" />;
        }
        return <Route {...otherProps} />;
    }

    return <Redirect to="/login" />;
}

const mapStateToProps = (state) => ({
    rehydrated: state._persist.rehydrated,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser,
    currentAdmin: state.admin.currentAdmin,
});

export default connect(mapStateToProps, { fetchUserMe, fetchAdminMe })(AuthenticateRoute);
