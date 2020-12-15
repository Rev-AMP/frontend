import React, { Component } from 'react';
import { Frame } from 'framer';
import { Form, FormGroup, Input, Col } from 'reactstrap';
import './login.styles.css';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
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
        console.log(this.state);

        let loginData = new FormData();
        loginData.append('username', this.state.username);
        loginData.append('password', this.state.password);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login/access-token`, {
            method: 'POST',
            body: loginData
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw Error(response);
                }
                return response.json()
            })
            .then(access_token => console.log(access_token))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Frame
                width={400}
                height={400}
                radius={30}
                animate={{ scale: 1.1 }}
                transition={{ duration: 2 }}
                background={"#61DAFB"}
            >
                <div className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Col>
                                <Input type="email" id="username" name="username"
                                    placeholder="Email"
                                    value={this.state.username}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Input type="password" id="password" name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                    </Form>
                    <div className="row">
                        <div className="col-12" align="center">
                            <Frame
                                width={100}
                                height={30}
                                onTap={this.handleSubmit}
                                whileHover={{ scale: 1.2 }}
                            >
                                Login
                            </Frame>
                        </div>
                    </div>
                </div>

            </Frame>
        );
    }
}

export default Login;