import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import AuthenticatedRoute from "components/AuthenticatedRoute";
import Dashboard from "pages/dashboard";
import Login from "pages/login";

class Main extends Component {
    render() {
        return (
            <Switch>
                <AuthenticatedRoute path="/app" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Redirect to="/app" />
            </Switch>
        );
    }
}

export default withRouter(Main);
