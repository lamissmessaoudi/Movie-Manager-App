import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import * as userService from "../services/userService"
import { loginWithJWT } from "../services/authService";


class Register extends Form {
    state = {
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
    }
    schema = {
        username: Joi.string()
            .required()
            .label('Username')
            .email(),
        password: Joi.string()
            .alphanum()
            .min(5)
            .required()
            .label('Password'),
        name: Joi.string().required().label('name'),

    }

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data)
            loginWithJWT(response.headers['x-auth-token'])
            window.location = '/'
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors }
                errors.username = ex.response.data;
                this.setState({ errors })
            }
        }
    }
    render() {
        return (
            <div>
                <h1>Register </h1>
                <form onSubmit={this.handleSubmit}>

                    {this.renderInput('username', 'Username',)}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}

                    {this.renderButton('Submit')}

                </form>

            </div>
        );
    }
}

export default Register;