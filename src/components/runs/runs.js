import React from 'react';
import { NavLink } from 'react-router-dom';
import RunHeader from '../nav_folder/run_nav';
import './runs.scss';
import plus from './images/plus.png';
import runIcon from './images/running-icon.png';
import axios from 'axios';

class Runs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date_buttons: []
    }
  }

  componentDidMount() {
    this.getDates();
  }

  async getDates() {
    const run_dates = await axios.get('/api/get_run_dates.php');
    const dates = run_dates.data.dates;
    console.log(dates);
    const date_buttons = dates.map((item) => {
      return (
        <div key={item.id} className="imgContainer col-6 col-md-6 col-sm-6 col-lg-6 text-center d-inline-block">
          <NavLink to={`/runmap/results/${item.id}`}>
            <button className="runImg btn btn-dark btn-lg">
              <div>{item.date}</div>
              <div className="run-time">{item.time}
              </div>
            </button>
          </NavLink>
        </div>
      )
    })
    this.setState({
      date_buttons: [...date_buttons]
    })
  }

  render() {
    return (
      <React.Fragment>
      <RunHeader />
      <div className="runs">
        <div className="imgContainer col-6 col-md-6 col-sm-6 col-lg-6 d-inline-block">
          <NavLink to="/runmap">
            <button className="plusImg btn btn-dark btn-lg">
            </button>
          </NavLink>
        </div>
        {this.state.date_buttons}
      </div>

      </React.Fragment>
    );
  }
}

export default Runs;
