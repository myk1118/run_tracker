import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';

class MapNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapClicked: false,
      milesClicked: false
    }
  }
  handleClickMap = () => {
    this.setState({
      mapClicked: true,
      milesClicked: false
    });
    this.props.clickMap();
  }
  handleClickMiles = () => {
    this.setState({
      milesClicked: true,
      mapClicked: false
    })
    this.props.clickMiles();
  }
  render() {
    return (
      <div className="headerContainer">
        <div className="mapHeaderContainer fixed-top">
          <div className="navLogo">Run-Tracker</div>
          <NavLink className="nav-link-home" exact to="/">
            <span className="oi" data-glyph="home"></span>
          </NavLink>
          <NavLink className="nav-link-aboutus" to="/aboutus">
            <span className="oi" data-glyph="people"></span>
          </NavLink>
          <NavLink className="nav-link-logout" to="/account/logout">
            <span className="oi" data-glyph="account-logout"></span>
          </NavLink>
        </div>
        <nav className="navbar navbar-custom fixed-top">
          <ul className="nav navbar-nav">
            <li onClick={this.handleClickMap} className={this.state.mapClicked ? 'nav-link selected' : 'nav-link'}>Map</li>
            <li onClick={this.handleClickMiles} className={this.state.milesClicked ? 'nav-link selected' : 'nav-link'}>Miles Run </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default MapNav;
