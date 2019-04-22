import React, { Component } from 'react';
import './map_nav.scss';
import { NavLink } from 'react-router-dom';

class MapNav extends Component {
    render() {
        return (
            <div className="headerContainer">
                <div className="mapHeaderContainer">
                    {/* <div className="col-2 offset-5 logoContainer">
                        <img src={lightBulb} className='img-thumbnail' />
                    </div> */}
                    <div className="logo">RunBuddyRun</div>
                </div>
                <nav className="navbar navbar-expand bg-light navbar-light nav-border">
                    <ul className="font-weight-bold navbar-nav nav-fill w-100">
                        <li className="nav-item">
                            <NavLink to="/runmap" className="nav-link" href="#">Map</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/runmap/stats" className="nav-link">Miles Run</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default MapNav;