import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../../general/input';

const LoginForm = props => {
    const { handleSubmit, logIn } = props;
    return (
        <form onSubmit={handleSubmit(logIn)}>
            <div
                // className="row"
                className="inputFields">
                <Field id="email" name="email" component={Input} type="email" placeholder="Email" />
                <Field id="password" name="password" component={Input} type="password" placeholder="Password" />
            </div>
            {/* <div className="row"> */}
            <div
                // className="col s12 center"
                className="buttonsContainer">
                <button className="btn btn-info">Log In</button>
                <button className="btn btn-info">Sign Up</button>
            </div>
            {/* </div> */}
        </form>
    )
}

// function validate({ email, password }) {
//     const errors = {};
//     if (!email) {
//         errors.email = 'Please enter your email';
//     }
//     if (!password) {
//         errors.password = 'Please enter your password';
//     }
//     return errors;
// }

export default reduxForm({
    form: 'login-form',
    // validate: validate
})(LoginForm);