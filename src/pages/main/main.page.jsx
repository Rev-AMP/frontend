import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';

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
            <Grid container justify="center" alignContent="center">
                <Switch>
                    <AuthenticatedRoute path="/app" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Redirect to="/app" />
                </Switch>
            </Grid>
        );
    }
}

export default withRouter(Main);