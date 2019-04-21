import React, { Component } from 'react';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import axios from 'axios';

class RunMap extends Component {
    state = {
        mileStats: [],
        distance: 2.,
        time: 480,
        mileage: 0,
        runId: 55
      }

      postlatestMile(){
        const {distance} = this.state;
        if(distance && distance - Math.floor(distance) === 0){
            let{distance, mileage, time, runId} = this.state;
            axios.get(`/api/addpermile.php?run_id=${runId}&distance=${distance}&time=${time}&mileage=${mileage}`).then((resp) => {
                console.log('this is response:', resp);
            })
    }
    }

  componentDidMount() {
    this.getCurrentLocation();
  }

    startWatch = () => {
        this.postlatestMile();
        this.refs.child.start();
    }
    pauseWatch = () => {
        this.refs.child.pause();
    }
    resetWatch = () => {
        this.refs.child.reset();
    }

    getCurrentLocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position)
        })
      } else {
        console.log('Location not found')
      }
    }


    render() {
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 d-inline-block mapContainer">
                    <div className="map"></div>
                    <div className="buttonsContainer">
                        <button onClick={this.startWatch} className="btn btn-info">Start</button>
                        <button onClick={this.pauseWatch} className="btn btn-info">Pause</button>
                        <button onClick={this.resetWatch} className="btn btn-info">Reset</button>
                    </div>
                </div>
                <div className="mapStatsContainer">
                    <div className="statContainer">
                        <div className="statTitle">Time</div>
                        <Stopwatch ref="child" className="statResult" />
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Distance</div>
                        <div className="statResult">100mi</div>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Pace</div>
                        <div className="statResult">11:44</div>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Calories Burned</div>
                        <div className="statResult">1,600 calories</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default RunMap;
