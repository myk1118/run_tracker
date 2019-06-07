import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import './nav.scss';


class MapNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapClicked: false,
      milesClicked: false,
      isOpen: false
    }
  }
  openModal = () => {
    this.setState({ isOpen: true })
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

  callPlayer(func, args) {
    let iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; ++i) {
        if (iframes[i]) {
            const src = iframes[i].getAttribute('src');
            if (src) {
                if (src.indexOf('youtube.com/embed') != -1) {
                    iframes[i].contentWindow.postMessage(JSON.stringify({
                        'event': 'command',
                        'func': func,
                        'args': args || []
                    }), "*");
                }
            }
        }
    }
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
        </div>
        <div id="exampleModalCenter" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content modalSize">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="video-container"><iframe width="853" height="480" src="https://www.youtube.com/embed/kVkEAOvszeI" frameborder="0" allowfullscreen></iframe></div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MapNav;
