import React from 'react';
import './aboutus.scss';
import David from '../../../public/dist/images/climbingavocado.jpg';
import Johnny from '../../../public/dist/images/avocadobackend.jpg';
import Alice from '../../../public/dist/images/avocadoalice.jpg';
import Jaime from '../../../public/dist/images/avocadojaime.jpg';
import { NavLink } from 'react-router-dom';

export default props => {
    return (
        <div>
            <div className="aboutUsNav">
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
            <div className="container">
                <div className="meetTheTeam">Meet the Team</div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <img src={David} className="card-img-top" alt="David" />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">David Lee</h5>
                                <div className="card-text text-black-50">Web Developer</div>
                                <div>Avocados are overrated.</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <img src={Johnny} className="card-img-top" alt="Johnny" />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">Johnny Pham</h5>
                                <div className="card-text text-black-50">Web Developer</div>
                                <div>I love avocados!</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <img src={Alice} className="card-img-top" alt="Alice" />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">Alice Le</h5>
                                <div className="card-text text-black-50">Web Developer</div>
                                <div>Holy Mole Guacamole</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-0 shadow">
                            <a className="card border-0" target="_blank" href="https://www.linkedin.com/in/myk1118/">
                                <img src={Jaime} className="card-img-top" alt="Jaime" />
                            </a>
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">Jaime Kim</h5>
                                <div className="card-text text-black-50">Web Developer</div>
                                <div>Hello.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}