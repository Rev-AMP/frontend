import React, { Component } from 'react';
import { Frame } from 'framer';
import { toast } from 'react-toastify';
import FormInput from '../../components/FormInput/FormInput.component';
import Button from '../../components/Button/Button.component';
import './login.styles.css';
import { Login as InitiateLogin, ClearLoginError } from 'redux/login/action';
import { FetchUserMe } from "redux/user/action";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

    componentDidUpdate(prevProps, prevState) {
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

    getUser = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${this.props.accessToken/*.cookies.get('access_token')*/}`
            }
        })
            .then(async response => {
                const json = await response.json();
                return response.ok ? json : Promise.reject(json);
            })
            .then(user => toast.success(`Hey there, ${user.full_name} 🙌`, {
                position: toast.POSITION.TOP_CENTER
            }))
            .catch(error => toast.error(`Error 😓: ${error.detail}`, {
                position: toast.POSITION.TOP_CENTER
            }));
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
        return (
            <Frame
                width={450}
                height={450}
                radius={30}
                animate={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                background={"#CCCCCC"}
            >
                <div className="flex-container">
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
                </div>
            </Frame>
        );
    }
}
const mapStateToProps = (state) => ({
    errorMessage: state.login.errorMessage || state.user.errorMessage, //TODO: check if this is fine
    accessToken: state.login.accessToken,
    isLoggedIn: state.login.isLoggedIn,
    currentUser: state.user.currentUser
});
export default withRouter(
    connect(mapStateToProps, { InitiateLogin, ClearLoginError, FetchUserMe })(Login)
);