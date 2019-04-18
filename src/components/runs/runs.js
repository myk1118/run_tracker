import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


class Runs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const background = {
      backgroundImage: 'url("https://img01.aws.kooomo-cloud.com/upload/299/cms/514596/default/16996/ciancorless.comLivignoSky2017-202340.jpg")'
    }
    const opacity = {
      opacity: '0.8'
    }
    const buttonStyle = {
      height: '120px',
      width: '120px',
      marginTop: '20px',
      opacity: '0.8'
    }
    const imageStyle = {
      width: '100%'
    }


    return (
      <div style={background} className="container-fluid">

        <div className="row">
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">
              <NavLink to="/runmap">
                <img style={imageStyle} src="https://cdn.pixabay.com/photo/2016/10/10/01/49/plus-1727487__340.png"/>
              </NavLink>
            </button>
          </div>
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button style={buttonStyle} className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Runs;
