import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Login from '../login/login.page';
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
                <Route exact path="/login" render={() => <Login cookies={this.props.cookies} />} />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default withCookies(Main);