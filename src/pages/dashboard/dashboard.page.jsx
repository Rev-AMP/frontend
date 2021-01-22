import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import {  withStyles, Grid } from '@material-ui/core';

import SideBar from 'components/SideBar/SideBar.component';
import Header from 'components/Header/Header.component';
import Users from 'pages/users/users.page';

const useStyles= theme =>({

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        padding: theme.spacing(3),
        flex:2
      },
})

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

        const { classes } = this.props;;
        return (
            <Grid container>
                <Header handleMenuButtonClick={this.switchDrawer} />
                <SideBar drawerOpen={this.state.drawerOpen} />

                <Grid item className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route component={Users} />
                </Switch>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser
});

export default withRouter(
    connect(mapStateToProps)(
        withStyles(useStyles)(Dashboard)
        )
);