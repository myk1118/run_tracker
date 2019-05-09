import React, {Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import RunHeader from '../nav_folder/run_nav';
import './runs.scss';
import plus from './images/plus.png';
import runIcon from './images/running-icon.png';
import backgroundImage from '../account/login/images/image19.jpeg';
import axios from 'axios';

class Runs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date_buttons: []
    }
  }

  componentDidMount() {
    this.getRunData();
  }

  async getRunData() {
    const run_dates = await axios.get('/api/get_run_dates.php');
    console.log(run_dates)
    const dates = run_dates.data.dates;
    const date_buttons = dates.map((item) => {
      return (
        <div key={item.id} className="imgContainer col-6 col-sm-6 col-md-6 col-lg-4">
          <NavLink to={`/results/${item.id}`}>
            <button className="bigSquareButton runImg btn btn-dark btn-lg">
              <div>{item.date}</div>
              <div className="run-time">{item.miles} miles</div>
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
      <Fragment>
        <RunHeader />
        <div className="runs">
          <img className="backgroundImage" src={backgroundImage} alt="Background Image" />
          <div className="runButtonsContainer">
            <div className="imgContainer col-6 col-sm-6 col-md-6 col-lg-4">
              <NavLink to="/runmap">
                <button className="bigSquareButton plusImg btn btn-dark btn-lg"></button>
              </NavLink>
            </div>
            {this.state.date_buttons}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Runs;
