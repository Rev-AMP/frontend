import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import Loader from "components/Loader";
import { fetchUserMe } from "redux/user/action";
import { fetchAdminMe } from "redux/admin/action";

function AuthenticatedRoute(props) {
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
        if (permission) {
            if (currentUser && currentUser.is_admin && !currentAdmin) {
                fetchAdminMe();
            }
            if (
                (currentUser && !currentUser.is_admin) ||
                (currentAdmin && !currentAdmin.permissions.isAllowed(permission))
            ) {
                toast.error(`Error 😓: You don't have ${permission} permissions`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
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

export default connect(mapStateToProps, { fetchUserMe, fetchAdminMe })(AuthenticatedRoute);
