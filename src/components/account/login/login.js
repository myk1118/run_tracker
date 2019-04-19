import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogInForm from './login_form';
import { logIn } from '../../../actions';

// import { Route } from 'react-router-dom';
// import './login.scss';

class LogIn extends Component {
    handleLogIn = (values) => {
        console.log('Form Values:', values);

        this.props.logIn(values);

    }
    render() {
        return (
            <div>
                <h1 className="center">Log In</h1>
                <LogInForm logIn={this.handleLogIn} />
            </div>
        );
    }
}

export default connect(null, {
    logIn: logIn
})(LogIn);
