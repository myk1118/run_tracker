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
      loggedIn: false,
      clicked: false
    }

    this.handleLogInButton = this.handleLogInButton.bind(this);
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

  handleLogInButton() {
    this.setState({
      clicked: !this.state.clicked // true
    });
  }

  render() {
    if (this.state.loggedIn === true) {
      return (<Redirect to="/" />)
    }
    else {                                      //true          false
      const className = this.state.clicked ? 'transition:hover' : 'transition';
      return (
        <div className="loginPage">
          <div className="loginPageLogo">RunBuddyRun</div>
          <div className="carouselContainer">
            <Carousel />
          </div>
          {/* <div className="loginFormContainer">
            <LogInForm logIn={this.handleLogIn} />
          </div> */}
          <div className="loginButtonsContainer">
            <button onClick={this.handleLogInButton} className="btn btn-info">Log In</button>
            <button className="btn btn-info">Sign Up</button>
          </div>
          <div className={className}>Log In
          {/* <div className="loginFormContainer">
              <LogInForm logIn={this.handleLogIn} />
            </div> */}
          </div>
        </div>
      );
    }
  }
}

export default connect(null, {
  logIn: logIn
})(LogIn);
