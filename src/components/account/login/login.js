import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import './login.scss';

class Login extends Component {
    render() {
        return (
            <div>
                {/* <!--Carousel Wrapper--> */}
                <div id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                    {/* <!--Indicators--> */}
                    <ol className="carousel-indicators">
                        <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                    </ol>
                    {/* <!--/.Indicators--> */}
                    {/* <!--Slides--> */}
                    <div className="carousel-inner" role="listbox">
                        {/* <!--First slide--> */}
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="./images/photo-1539182972012-585804f77548.jpeg"
                                alt="First slide" />
                        </div>
                        {/* <!--/First slide--> */}
                        {/* <!--Second slide--> */}
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                                alt="Second slide" />
                        </div>
                        {/* <!--/Second slide--> */}
                        {/* <!--Third slide--> */}
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                alt="Third slide" />
                        </div>
                        {/* <!--/Third slide--> */}
                    </div>
                    {/* <!--/.Slides--> */}
                    {/* <!--Controls--> */}
                    <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                    {/* <!--/.Controls--> */}
                </div>
                {/* <!--/.Carousel Wrapper--> */}

                {/* <Router /> */}
                <div className="text-center">
                    <button type="button" className="btn btn-warning center-block">Sign Up</button>
                    <button type="button" className="btn btn-warning center-block">Log In</button>
                </div>

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
                    <button type="submit" className="btn btn-warning center-block">Submit</button>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-warning">Guest</button>
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-warning">Tutorial</button>
                </div>
            </div>
        );
    }
}

export default Login;
