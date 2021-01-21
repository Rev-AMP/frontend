import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';

import './login.styles.css';
import FormInput from 'components/FormInput/FormInput.component';
import Button from 'components/Button/Button.component';
import { Login as InitiateLogin } from 'redux/auth/action';
import { FetchUserMe } from "redux/user/action";

toast.configure();
const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);

class Login extends Component {
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.errorMessage !== this.props.errorMessage && this.props.errorMessage !== '') {
            toast.error(`Error 😓: ${this.props.errorMessage}`, {
                position: toast.POSITION.TOP_CENTER
            })
        }

        if (prevProps.isLoggedIn !== this.props.isLoggedIn && this.props.isLoggedIn) {
            this.props.FetchUserMe();
        }

        if (prevProps.currentUser !== this.props.currentUser && this.props.currentUser) {
            toast.success(`Hey there, ${this.props.currentUser.full_name} 🙌`, {
                position: toast.POSITION.TOP_CENTER
            });
            this.props.history.push("/")
        }
    }


    handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        this.setState({
            [field]: value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.state.errors;

        if (errors.username.length !== 0 || errors.password.length !== 0) return;

        if (this.state.username.length === 0 || this.state.password.length === 0) {
            toast.error(`Empty Fields 💔`, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        this.props.InitiateLogin({ username: this.state.username, password: this.state.password });

    }

    validateField = e => {
        e.preventDefault();

        const { name, value } = e.target;
        const errors = this.state.errors;

        switch (name) {
            case 'username':
                errors.username = validEmailRegex.test(value) ? '' : 'Your Email ID does not look right 🤔';
                break;

            case 'password':
                errors.password = value.length > 0 ? '' : 'Please enter a valid password 🥺';
                break;

            default:
                break;
        }

        this.setState({ errors });
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Grid container justify="center">
                    <img src={process.env.PUBLIC_URL + "miscellaneous/loader.gif"} alt="loading"/>
                </Grid>
            );
        }

        return (
            <Grid container justify="center">
                <Paper className="flex-container" style={{ width: "80vw", maxWidth: 450, height: "70vh", maxHeight: 450 }}>
                    <FormInput
                        type="email"
                        name="username"
                        placeholder="Email ID"
                        value={this.state.username}
                        handleChange={this.handleInputChange}
                        handleBlur={this.validateField}
                    />
                    {this.state.errors.username.length > 0 ? <span className="errors">{this.state.errors.username}</span> : null}
                    <FormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        handleChange={this.handleInputChange}
                        handleBlur={this.validateField}
                    />
                    {this.state.errors.password.length > 0 ? <span className="errors">{this.state.errors.password}</span> : null}
                    <Button buttonType="primary" handleClick={this.handleSubmit}>Submit</Button>
                </Paper>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    errorMessage: state.auth.errorMessage || state.user.errorMessage,
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.user.currentUser,
    isLoading: state.auth.isLoading || state.user.isLoading
});

export default withRouter(
    connect(mapStateToProps, { InitiateLogin, FetchUserMe })(Login)
);