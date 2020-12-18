import React, { Component } from 'react';
import { Frame } from 'framer';
import { toast } from 'react-toastify';
import './login.styles.css';

toast.configure();
const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

class Login extends Component {
    constructor() {
        super();

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

        if (errors.username.length !== 0 || errors.password.length !== 0) {
            console.log('bahhhas');
            return;
        }

        if (this.state.username.length === 0 || this.state.password.length === 0) {
            toast.error(`Empty Fields 💔`, {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }

        let loginData = new FormData();
        loginData.append('username', this.state.username);
        loginData.append('password', this.state.password);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
            method: 'POST',
            body: loginData
        })
            .then(async response => {
                const json = await response.json();
                return response.ok ? json : Promise.reject(json);
            })
            .then(token_object => this.setState({ user_auth_token: token_object.access_token }, this.getUser))
            .catch(error => toast.error(`Error 😓: ${error.detail}`, {
                position: toast.POSITION.TOP_CENTER
            }));
    }

    getUser = () => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${this.state.user_auth_token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw Error(response);
                }
                return response.json()
            })
            .then(user => toast.success(`Hey there, ${user.full_name} 🙌`, {
                position: toast.POSITION.TOP_CENTER
            })
            )
            .catch(error => toast.error(`Error 😓: ${error.message}`, {
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
                    <input
                        type="email"
                        name="username"
                        placeholder="Email ID"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        onBlur={this.validateField}
                    />
                    {this.state.errors.username.length > 0 ? <span className="errors">{this.state.errors.username}</span> : null}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        onBlur={this.validateField}
                    />
                    {this.state.errors.username.length > 0 ? <span className="errors">{this.state.errors.password}</span> : null}

                    <button className="submit--button" onClick={this.handleSubmit}>Submit</button>
                </div>
            </Frame>
        );
    }
}

export default Login;