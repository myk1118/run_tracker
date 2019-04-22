import React, { Component } from 'react';
import './nav.scss';
import { NavLink } from 'react-router-dom';


class MapNav extends Component {
    render() {
        return (
<div className="headerContainer">
  <div className="row mapHeaderContainer">
  </div>
  <nav className="navbar navbar-expand navbar-custom navbar-center py-0 ">
    <div className="container-fluid ">
      <ul className='nav navbar-nav mx-auto py-0 '>
        <li><NavLink to="/runmap" className="nav-link" href="#">Map</NavLink></li>
        <li><NavLink to="/runmap/stats" className="nav-link">Miles Run</NavLink></li>
      </ul>
    </div>
  </nav>
</div>
        )
    }
}


export default MapNav;