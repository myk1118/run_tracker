import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logIn } from '../../../actions';
// import { Route } from 'react-router-dom';
import LogInForm from './login_form';
import Carousel from './carousel';
import './login.scss';

class LogIn extends Component {

    handleLogIn = (values) => {
        console.log('Form Values:', values);
        this.props.logIn(values);

        axios.post('/api/login.php', {
          topic: 'topic',
          logs: values,
        }).then(resp => {
          console.log('resp: ', resp.data)
        });
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
