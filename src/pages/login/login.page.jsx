import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Grid, withStyles, TextField } from '@material-ui/core';

import Button from 'components/Button/Button.component';
import { Login as InitiateLogin } from 'redux/auth/action';
import { FetchUserMe } from "redux/user/action";
import Loader from "components/Loader";

toast.configure();
const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i);

const styles = theme => ({
    flexContainer: {
        flexDirection: "column",
        width: "80vw",
        height: "70vh",
        justifyContent: "center",
        alignContent: "center",
        display: 'flex',
        padding: "2em"
    },
    errors: {
        fontSize: "1em",
        margin: "0 12px 5px 12px",
    },
    image: {
        padding: "1em",
        marginBottom: "2em"
    }
})

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
        const { classes } = this.props;

        if (this.props.isLoading) {
            return (
                <Loader />
            );
        }

        return (

            <Paper component={Grid} item className={classes.flexContainer}
                xs={11} md={4}
            >
                <img className={classes.image} src={"/logos/revamp_transparent.png"} alt="" />

                <TextField
                    type="email"
                    name="username"
                    label="Email ID"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    onBlur={this.validateField}
                    error={!!this.state.errors.username}
                    helperText={this.state.errors.username}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    onBlur={this.validateField}
                    error={!!this.state.errors.password}
                    helperText={this.state.errors.password}
                />
                <Button style={{ marginTop: "3em" }} variant="contained" onClick={this.handleSubmit}>Submit</Button>
            </Paper>
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
    withStyles(styles)(
        connect(mapStateToProps, { InitiateLogin, FetchUserMe })(Login)
    )
);