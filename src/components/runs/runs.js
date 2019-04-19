import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import RunHeader from '../nav_folder/run_nav';
import './runs.scss';
import plus from './images/plus.png';



class Runs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <React.Fragment>
      <RunHeader />
      <div  className="container-fluid runs">
        <div className="row">
          <div className="col-6 text-center">
            <button  className="btn btn-dark btn-lg">
              <NavLink to="/runmap">
                <img className="plus-img" src={plus}/>
              </NavLink>
            </button>
          </div>
          <div className="col-6 text-center">
            <button className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button  className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button  className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
        <div className="row">
          <div className="col-6 text-center">
            <button className="btn btn-dark btn-lg">4/20/19</button>
          </div>
          <div className="col-6 text-center">
            <button  className="btn btn-dark btn-lg">4/20/19</button>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }
}

export default Runs;
