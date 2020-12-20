import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../login/login.page';

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Switch>
                <Route exact path="/login" component={ Login } />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default Main;