import React, { Component } from 'react';
import { Frame } from 'framer';
import './login.styles.css';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            user_auth_token: ''
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

        let loginData = new FormData();
        loginData.append('username', this.state.username);
        loginData.append('password', this.state.password);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
            method: 'POST',
            body: loginData
        })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.json());
                }
                return response.json();
            })
            .then(token_object => this.setState({ user_auth_token: token_object.access_token }, this.getUser))
            .catch(error => console.log(`Login Error: ${error.message}`));
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
            .then(user=> console.log(`Hey, ${user.full_name}`))
            .catch(error => console.log(`Auth Error: ${error.message}`));
    }

    render() {
        return (
            <Frame
                width={400}
                height={400}
                radius={30}
                animate={{ scale: 1.1 }}
                transition={{ duration: 2 }}
                background={"#CCCCCC"}
            >
                <div className="flex-container">
                    <input type="email" name="username" placeholder="Email ID" value={this.state.username} onChange={this.handleInputChange} />
                    <input type="password" name="password" placeholder={"Password"} value={this.state.password} onChange={this.handleInputChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </Frame>
        );
    }
}

export default Login;