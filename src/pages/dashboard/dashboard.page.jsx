import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';
import { withStyles, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';

import SideBar from 'components/SideBar/SideBar.component';
import Header from 'components/Header/Header.component';
import Users from 'pages/users/users.page';
import AuthenticatedRoute from 'components/AuthenticatedRoute/AuthenticatedRoute.component';

toast.configure();

const useStyles = theme => ({
    content: {
        padding: theme.spacing(3),
        flex: 2
    },
})

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage !== '') {
            toast.error(`Error 😓: ${this.props.errorMessage}`, {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    switchDrawer = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Header handleMenuButtonClick={this.switchDrawer} />
                <SideBar drawerOpen={this.state.drawerOpen} />

                <Grid item className={classes.content}>
                    <Switch>
                        <AuthenticatedRoute exact path={`${this.props.match.url}/users`} component={Users} />
                    </Switch>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    errorMessage: state.user.errorMessage
});

export default withRouter(
    connect(mapStateToProps)(
        withStyles(useStyles)(Dashboard)
    )
);