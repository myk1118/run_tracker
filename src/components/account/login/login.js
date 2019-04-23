import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../../actions';
import axios from 'axios';
import LogInForm from './login_form';
import Carousel from './carousel';
import './login.scss';
import { Redirect } from 'react-router-dom';
import SignUp from '../sign_up';

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
                <div className="loginPageLogo">Run</div>
                <div className="carouselContainer">
                    <Carousel />
                </div>
                <div className="loginFormContainer">
                    <LogInForm logIn={this.handleLogIn} />
                </div>
            </div>
        ); }
    }
}

export default connect(null, {
    logIn: logIn
})(LogIn);
