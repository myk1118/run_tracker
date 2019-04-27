import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    const { handleSubmit, signUp } = props;
    return (
        <form onSubmit={handleSubmit(signUp)}>
            <div
                // className="row"
                className="inputFields">
                <Field col="s12" id="first_name" name="first_name" component={Input} label="First Name" placeholder="First Name" />
                <Field col="s12" id="last_name" name="last_name" component={Input} label="Last Name" placeholder="Last Name" />
                <Field col="s12" id="gender" name="gender" component={Input} label="Gender" placeholder="Gender" />
                <Field col="s12" id="age" name="age" component={Input} label="Age" placeholder="Age" />
                <Field col="s12" id="height" name="height" component={Input} label="Height" placeholder="Height" />
                <Field col="s12" id="weight" name="weight" component={Input} label="Weight" placeholder="Weight" />
                <Field col="s12" id="email" name="email" component={Input} label="Email" placeholder="Email" />
                <Field col="s12" id="password" name="password" component={Input} type="password" label="Password" placeholder="Password" />
                <Field col="s12" id="confirmpassword" name="confirmpassword" component={Input} type="password" label="Confirm Password" placeholder="Confirm Password" />
            </div>
            {/* <div className="row"> */}
            <div
                // className="col s12 right-align"
                className="buttonsContainer">
                <button className="btn btn-info">Sign Up</button>
            </div>
            {/* </div> */}
        </form>
    )
}

function validate({ first_name, last_name, gender, age, height, weight, email, password, confirmpassword }) {
    const errors = {};
    if (!first_name) {
        errors.first_name = 'Please enter first name';
    }
    if (!last_name) {
        errors.last_name = 'Please enter last name';
    }
    if (!gender) {
        errors.gender = 'Please enter your gender';
    }
    if (!age) {
        errors.age = 'Please enter your age';
    }
    if (!height) {
        errors.height = 'Please enter your height';
    }
    if (!weight) {
        errors.weight = 'Please enter your weight';
    }
    if (!email) {
        errors.email = 'Please enter your email';
    }
    if (!password) {
        errors.password = 'Please enter your password';
    }
    if (!confirmpassword) {
        errors.confirmpassword = 'Required';
    } else if (confirmpassword !== password) {
        errors.confirmpassword = 'Password did not match! Please try again.';
    }
    return errors;
}

export default reduxForm({
    form: 'sign-up-form',
    validate: validate
})(SignUpForm);
