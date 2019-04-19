import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const LoginForm = props => {
    const { handleSubmit, logIn } = props;
    return (
        <form onSubmit={handleSubmit(logIn)}>
            <div className="row">
                <Field col="s12" id="email" name="email" component={Input} label="Email" />
                <Field col="s12" id="password" name="password" component={Input} type="password" label="Password" />
            </div>

            <div className="row">
                <div className="col s12 center">
                    <button className="btn blue darken-2">Log In</button>
                </div>
            </div>
        </form>
    )
}

function validate({ email, password }) {
    const errors = {};

    if (!email) {
        errors.email = 'Please enter your email';
    }

    if (!password) {
        errors.password = 'Please enter your password';
    }

    return errors;
}

export default reduxForm({
    form: 'login-form',
    validate: validate
})(LoginForm);