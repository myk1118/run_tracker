import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogInForm from './login_form';
import { logIn } from '../../../actions';
import { Route } from 'react-router-dom';
import Carousel from './carousel';
import './login.scss';

class LogIn extends Component {
    handleLogIn = (values) => {
        console.log('Form Values:', values);

        this.props.logIn(values);

    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(null, {
    logIn: logIn
})(LogIn);
