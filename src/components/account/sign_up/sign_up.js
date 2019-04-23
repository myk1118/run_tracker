import React, { Component } from 'react';
import SignUpForm from './signup_form';
import axios from 'axios';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }
    handleSignUp(values){
      console.log('values: ', values)
        axios.post('/api/signup.php', values).then(resp => {
          console.log('the response: ', resp);
          if(resp.data.success) {
            this.setState({
              loggedIn: true
            })
          }
        })
    }

    render() {
        return (
            <div>
                <h1 className="center">Sign Up</h1>
                <SignUpForm signUp={this.handleSignUp}/>
            </div>
        );
    }
}

export default SignUp;
