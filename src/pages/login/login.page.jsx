import React, { Component } from 'react';
import { Frame } from 'framer';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import './login.styles.css';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
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
                                <Input type="email" id="email" name="email"
                                    placeholder="Email"
                                    value={this.state.email}
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