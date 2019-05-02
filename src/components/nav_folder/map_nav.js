import React, { Component } from 'react';
import './nav.scss';
import { NavLink } from 'react-router-dom';

export default props => {
  return (
    <div className="headerContainer">
      <div className="mapHeaderContainer">
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
      <nav className="navbar navbar-expand navbar-custom navbar-center py-0">
        <div className="navHeight container-fluid">
          <ul className='nav navbar-nav mx-auto py-0'>
            <li><NavLink onClick={props.clickMap} className="nav-link">
            <div className="textContainer">Map</div> </NavLink></li>
            <li><NavLink onClick={props.clickMiles} className="nav-link"><div className="textContainer">Miles Run</div> </NavLink></li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
