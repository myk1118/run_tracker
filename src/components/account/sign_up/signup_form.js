import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    const { handleSubmit, signUp } = props;

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <div className="row">
                <Field col="s12" id="first_name" name="first_name" component={Input} label="First Name" placeholder="First Name" />
                <Field col="s12" id="last_name" name="last_name" component={Input} label="Le Name" placeholder="Last Name" />
                <Field col="s12" id="email" name="email" component={Input} label="Email" placeholder="Email" />
                <Field col="s12" id="password" name="password" component={Input} type="password" label="Password" placeholder="Password" />
                <Field col="s12" id="confirmpassword" name="confirmpassword" component={Input} type="password" label="Confirm Password" placeholder="Confirm Password" />

            </div>

            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn purple darken-1">Sign Up</button>
                </div>
            </div>
        </form>
    )
}

function validate({first_name, last_name, email, password, confirmpassword}) {
    const errors = {};

    if(!first_name) {
        errors.first_name = 'Please enter first name';
    }

    if(!last_name) {
        errors.last_name = 'Please enter last name';
    }

    if (!email) {
        errors.email = 'Please enter your email';
    }

    if (!password) {
        errors.password = 'Please enter your password';
    }

    if(!confirmpassword) {
        errors.confirmpassword = 'Required';
    } else if (confirmpassword !== password ){
        errors.confirmpassword = 'Password did not match! Please try again.';
    }

    return errors;
}

export default reduxForm({
    form: 'sign-up-form',  
    validate: validate
})(SignUpForm);