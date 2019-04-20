import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../../actions';
// import { Route } from 'react-router-dom';
import LogInForm from './login_form';
import Carousel from './carousel';
import './login.scss';

class LogIn extends Component {
    handleLogIn = (values) => {
        this.props.logIn(values);
    }
    render() {
        return (
            <div className="loginPage">
                <div className="carousel">
                    <Carousel />
                </div>
                <div className="logInForm">
                    <LogInForm logIn={this.handleLogIn} />
                </div>
            </div>
        );
    }
}

export default connect(null, {
    logIn: logIn
})(LogIn);
