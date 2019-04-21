import React, {Component} from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import Chart from '../total_stats/chart';
import MyMapComponent from './map';

class RunResult extends Component {
    constructor(props) {
      super(props);

      this.state = {
        chartData: {},
        currentLatLng: {
          lat: 33,
          lng: -117
        }
      }
    }

    componentDidMount() {
      this.getChartData();
    }

    getChartData() {
    this.setState({
      chartData: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Time',
            fill: false,
            data: [6.4, 7,8.5,7.6,8,9,9.6],
            borderColor: 'blue',
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Today\'s Run',
          fontSize: 25
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Mile'
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Minutes'
            }
          }],
        }
      }

    })
  }

    render() {
      return(
        <div className="postRunBody">
          <RunHeader />
            {/* <div className="bg-secondary">Header</div>
            <div className="bg-secondary">Nav Bar</div> */}
            <div className="postRunMap">
                {/* <div className="mapContainer"> */}
                  <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    currentLocation = {this.state.currentLatLng}
                  />
                {/* </div> */}
            </div>
            <div className="postRunStats">
                <div className="col-6">Total Distance</div>
                <div className="col-6">Total Time</div>
                <div className="col-6">Avg Pace</div>
                <div className="col-6">Total Calories Burned</div>
            </div>
            <div className="graphContainer">
                <div className="graph">
                  <Chart options={this.state.options} chartData={this.state.chartData}/>
                </div>
            </div>
        </div>
    )
  }
}

export default RunResult;
