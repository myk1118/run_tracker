import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';

class RunHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <div className="headerContainer">
                    <div className="mapHeaderContainer fixed-top">
                        <div className="navLogo">Run-Tracker</div>
                        <span className="oi questionMark" data-glyph="question-mark" data-toggle="modal" data-target="#exampleModalCenter">
                        </span>
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
                            <li><NavLink className="nav-link" activeClassName="active selected" exact to="/">Runs</NavLink></li>
                            <li><NavLink className="nav-link" activeClassName="active selected" to="/totalstats">Total Stats</NavLink></li>
                            <li><NavLink className="nav-link" activeClassName="active selected" to="/table">Activity Log</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div id="exampleModalCenter" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content modalSize">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div class="video-container"><iframe width="853" height="480" src="https://www.youtube.com/embed/dUAV1j9yvRE" frameborder="0" allowfullscreen></iframe></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RunHeader;
