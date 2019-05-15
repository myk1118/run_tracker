import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const GuestLoginForm = props => {
    const { handleSubmit, guestLogin } = props;
    return (
        <form onSubmit={handleSubmit(guestLogin)}>
            <button className="loginButton btn btn-info">Guest</button>
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
})(GuestLoginForm);
