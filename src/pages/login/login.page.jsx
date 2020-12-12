import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };
    }
    
    render() {
        return (
            <p>Gaylo, World!</p>
        );
    }
}

export default Login;