import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import AuthenticatedRoute from "components/AuthenticatedRoute/AuthenticatedRoute.component";
import Dashboard from "pages/dashboard/dashboard.page";
import Login from 'pages/login/login.page';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // TBA    
        }
    }

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