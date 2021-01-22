import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import AuthenticatedRoute from "components/AuthenticatedRoute/AuthenticatedRoute.component";
import Dashboard from "pages/dashboard/dashboard.page";
import Login from 'pages/login/login.page';
import {Grid} from '@material-ui/core';
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
                <AuthenticatedRoute exact path="/" component={Dashboard}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
            </Grid>
        );
    }
}

export default withRouter(Main);