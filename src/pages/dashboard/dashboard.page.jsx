import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import './dashboard.styles.css';
import SideBar from 'components/SideBar/SideBar.component';
import Header from 'components/Header/Header.component';
import Users from 'pages/users/users.page';
// import Grid from '@material-ui/core/Grid'


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    switchDrawer = () => {
        this.setState({
           drawerOpen: !this.state.drawerOpen
        });
    }

    render() {
        return (
            <div>
                <Header handleMenuButtonClick={this.switchDrawer} />
                <SideBar drawerOpen={this.state.drawerOpen} />

                <Switch>
                    <Route component={Users} />
                </Switch>
                {/* <h1>Hello {this.props.currentUser.full_name}</h1> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser
});

export default withRouter(
    connect(mapStateToProps)(Dashboard)
);