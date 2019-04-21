import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    // console.log('Sign In Form Props:', props);
    const { handleSubmit, signUp } = props;

    return (
        <form onSubmit={handleSubmit(signUp)}>
            {/*if we want to test what parameters it is given, we can CL it like this */}
            <div className="row">
                <Field col="s12" id="name" name="name" component={Input} label="Name" />
                <Field col="s12" id="email" name="email" component={Input} label="Email" />
                <Field col="s12" id="password" name="password" component={Input} type="password" label="Password" />
                <Field col="s12" id="confirmpassword" name="confirmpassword" component={Input} type="password" label="Confirm Password" />

            </div>

            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn purple darken-2">Sign Up</button>
                </div>
            </div>
        </form>
    )
}

function validate({name, email, password, confirmpassword}) {
    const errors = {};

    if(!name) {
        errors.name = 'Please enter full name';
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
    form: 'sign-up-form', //this is us setting the name of the form, THIS IS MADE-UP!!!! 
    validate: validate
})(SignUpForm);
