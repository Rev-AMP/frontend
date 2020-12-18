import React, { Component } from 'react';
import { Frame } from 'framer';
import { toast } from 'react-toastify';
import './login.styles.css';

toast.configure();

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
                    <button className="submit--button" onClick={this.handleSubmit}>Submit</button>
                </div>
            </Frame>
        );
    }
}

export default Login;