import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user_auth_token: '',
            errors: {
                username: '',
                password: ''
            }
        };
    }

    render() {
        return (
            <h1>Hello {this.currentUser.full_name}</h1>
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