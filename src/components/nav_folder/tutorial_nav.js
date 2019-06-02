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
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="col-10 offset-1 modal-content2">
                            {/* <div className="modal-header"> */}
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-container col-12">
                                <h5 className="modal-title" id="exampleModalLongTitle">How to Use Run-Tracker</h5>
                                {/* </div> */}
                                <div className="text-center modal-body">
                                    • Click plus (+) to start and record a new run<br />
                                    • Click a runner to view your past run
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default RunHeader;
