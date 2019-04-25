import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, signUp } from '../../../actions';
import axios from 'axios';
import LogInForm from './login_form';
import SignUpForm from '../sign_up/signup_form';
import Carousel from './carousel';
import './login.scss';
import { Redirect } from 'react-router-dom';
// import SignUp from '../sign_up';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      signedUp: false,
      transition: {
        height: '0px'
      },
      transitionBackground: {
        height: '0px'
      },
      loginHidden: true,
      signupHidden: true
    }
    this.handleLogInButton = this.handleLogInButton.bind(this);
    this.handleSignUpButton = this.handleSignUpButton.bind(this);
    this.hideTransition = this.hideTransition.bind(this);
  }
  handleLogIn = (values) => {
    this.props.logIn(values);
    axios.post('/api/login.php', values).then(resp => {
      console.log('response: ', resp);
      if (resp.data.success) {
        this.setState({
          loggedIn: true
        })
      }
    })
  }

  handleSignUp = (values) => {
    debugger;
    this.props.signUp(values);
    axios.post('/api/signup.php', values).then(resp => {
      console.log('response: ', resp);
      if (resp.data.success) {
        this.setState({
          signedUp: true
        })
      }
    })
    this.handleLogIn(values);
  }

  handleLogInButton() {
    this.setState({
      transition: {
        height: '80vh'
      },
      transitionBackground: {
        height: '100vh'
      },
      loginHidden: false
    });
  }

  handleSignUpButton() {
    this.setState({
      transition: {
        height: '80vh'
      },
      transitionBackground: {
        height: '100vh'
      },
      signupHidden: false
    });
  }

  hideTransition() {
    this.setState({
      transition: {
        height: '0px'
      },
      transitionBackground: {
        height: '0px'
      },
      loginHidden: true,
      signupHidden: true
    });
  }

  render() {
    if (this.state.loggedIn === true) {
      return (<Redirect to="/" />)
    }
    else {
      return (
        <div className="loginPage">
          <div className="loginPageLogo">RunBuddy</div>
          <div className="carouselContainer">
            <Carousel />
          </div>
          <div className="loginButtonsContainer">
            <button onClick={this.handleLogInButton} className="btn btn-info" >Log In</button>
            <button onClick={this.handleSignUpButton} className="btn btn-info">Sign Up</button>
          </div>
          <div className="transition" style={this.state.transition}>
            <div className={this.state.loginHidden ? 'hidden' : 'loginFormContainer'}>
              <LogInForm logIn={this.handleLogIn} />
            </div>
            <div className={this.state.signupHidden ? 'hidden' : 'loginFormContainer'}>
              <SignUpForm signUp={this.handleSignUp} />
            </div>
          </div>
          <div className="transitionBackground" style={this.state.transitionBackground} onClick={this.hideTransition}></div>
        </div>
      );
    }
  }
}

export default connect(null, {
  logIn: logIn,
  signUp: signUp
})(LogIn);
