import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Carousel from './carousel';
import './login.scss';

class Login extends Component {
    render() {
        return (
            <div>
                <Carousel />
                {/* <Router /> */}
                {/* <div className="text-center">
                    <button type="button" className="btn btn-warning center-block">Sign Up</button>
                    <button type="button" className="btn btn-warning center-block">Log In</button>
                </div> */}
                <div className="loginContainer">
                    <form className="form-group row justify-content-center">
                        {/* <label className="col-sm-2 col-form-label">Email</label> */}
                        <div className="col-sm-5">
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                        </div>
                    </form>
                    <form className="form-group row justify-content-center">
                        {/* <label className="col-sm-2 col-form-label">Password</label> */}
                        <div className="col-sm-5">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                    </form>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning center-block">Log In</button>
                    </div>
                </div>
                {/* <div className="text-center">
                    <button type="button" className="btn btn-warning">Guest</button>
                </div> */}
                {/* <div className="text-center">
                    <button type="button" className="btn btn-warning">Tutorial</button>
                </div> */}
            </div>
        );
    }
}

export default Login;
