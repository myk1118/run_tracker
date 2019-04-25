import React, { Component } from 'react';
import './nav.scss';
import { NavLink } from 'react-router-dom';

export default props => {
  return (
    <div className="headerContainer">
      <div className="mapHeaderContainer">
        <div className="navLogo">RunBuddy</div>
        <NavLink className="nav-link-aboutus" to="/aboutus">About Us</NavLink>
        <NavLink className="nav-link-logout" to="/login">Log Out</NavLink>
      </div>
      <nav className="navbar navbar-expand navbar-custom navbar-center py-0 ">
        <div className="container-fluid ">
          <ul className='nav navbar-nav mx-auto py-0 '>
            <li><NavLink onClick={props.clickMap} className="nav-link">Map</NavLink></li>
            <li><NavLink onClick={props.clickMiles} className="nav-link">Miles Run</NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
