import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { logIn } from '../../../actions';
import LogInForm from './login_form';
import Carousel from './carousel';
import './login.scss';
import { Redirect } from 'react-router-dom';

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  handleLogIn = (values)  => {
      this.props.logIn(values);
      axios.post('/api/login.php', values).then(resp => {
        console.log('response: ', resp);
        if(resp.data.success) {
          this.setState({
            loggedIn: true
          })
        }
      })

    }

    render() {
      if(this.state.loggedIn === true) {
    return (<Redirect to="/" />) }
    else {
        return (
            <div className="loginPage">
                <div className="carousel">
                    <Carousel />
                </div>
                <div className="logInForm">
                    <LogInForm logIn={this.handleLogIn} />
                </div>
            </div>
        ); }
    }
}

export default connect(null, {
    logIn: logIn
})(LogIn);
