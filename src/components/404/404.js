import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Background404 from '../../../public/dist/images/female-running-wallpaper.jpg';
import './404.scss';


export default props => {
    return (
        <div>
            <div className="aboutUsNav fixed-top">
                <div className="navLogo">Run-Tracker</div>
                <NavLink className="nav-link-home" to="/">
                    <span className="oi" data-glyph="home"></span>
                </NavLink>
                <NavLink className="nav-link-aboutus" to="/aboutus">
                    <span className="oi" data-glyph="people"></span>
                </NavLink>
                <NavLink className="nav-link-logout" to="/account/logout">
                    <span className="oi" data-glyph="account-logout"></span>
                </NavLink>
            </div>

            <div className="not-found">
                <div className="not-found-content">
                    <img className="background404" src={Background404} alt="Background" />
                    <div className="error">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <h3>Sorry, an error has occurred, requested page not found!</h3>
                        <div>
                            <Link to="/">
                                <span className="oi homeIcon" data-glyph="home"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}