import React, {Component} from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import ResultsChart from './results_chart';
import MyMapComponent from './map';
import apiKey from '../googlemap';

class RunResult extends Component {
    constructor(props) {
      super(props);

      this.state = {
        chartData: {},
        options: {},
        currentLatLng: {
          lat: 33,
          lng: -117
        },
      }
    }

    componentDidMount() {
      this.getChartData();
    }

  async getChartData() {

    const resp =  await axios.get('/api/get_runsession_results.php');
    const {sessionData} = resp.data;
    // console.log(sessionData)
    const miles = sessionData.map(mile => mile.currentMile);
    const time = sessionData.map(minutes => minutes.time)
    console.log('miles: ', miles);
    console.log('time: ', time);

    this.setState({
      chartData: {
        labels: [0, ...miles],
        datasets: [
          {
            label: 'Time',
            fill: false,
            data: [0, ...time],
            borderColor: 'blue',
          }
        ]
      },
    })
  }

    render() {
      return(
        <div className="postRunBody">
          <RunHeader />
            {/* <div className="bg-secondary">Header</div>
            <div className="bg-secondary">Nav Bar</div> */}
            <div className="postRunMap">
                  <MyMapComponent
                    isMarkerShown
                    // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    currentLocation = {this.state.currentLatLng}
                  />
            </div>
            <div className="postRunStats">
                <div className="col-6">Total Distance</div>
                <div className="col-6">Total Time</div>
                <div className="col-6">Avg Pace</div>
                <div className="col-6">Total Calories Burned</div>
            </div>
            <div className="graphContainer">
                <div className="graph">
                  <ResultsChart  chartData={this.state.chartData}/>
                </div>
            </div>
        </div>
    )
  }
}

export default RunResult;
