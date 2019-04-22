import React, { Component } from 'react';
import axios from 'axios';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import Distance from './distance';

class RunMap extends Component {
  constructor(props) {
          super(props);
          this.state = {
              status: 'stopped',
              start: null,
              elapsed: 0,
              distance: 0,
              pace: 100,
              calories: 100,
          }
          this.start = this.start.bind(this);
          this.pause = this.pause.bind(this);
          this.update = this.update.bind(this);
          this.reset = this.reset.bind(this);
          this.distanceIncrement = this.distanceIncrement.bind(this);
          this.distanceUpdate = this.distanceUpdate.bind(this);
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

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(position)
            })
        } else {
            console.log('Location not found')
        }
    }
    start() {
        const { start, elapsed } = this.state;
        let newStart = new Date().getTime();
        if (start) {
            newStart -= elapsed;
        }
        this.setState({
            status: 'running',
            start: newStart
        });
        setTimeout(() => {
            this.update();
        }, 10);
    }
    pause() {
        this.setState({
            status: 'stopped'
        })
    }
    reset() {
        const { elapsed } = this.state;
        if (this.state.status === 'stopped') {
            this.postCurrentRun(elapsed);
            this.setState({
                status: 'stopped',
                start: null,
                elapsed: 0
            });
        }
    }
    update() {
        const { status, start } = this.state;
        if (status === 'running') {
            this.setState({
                elapsed: new Date().getTime() - start
            })
            setTimeout(this.update, 10);
        }
    }
    distanceIncrement() {
        setTimeout(() => {
            this.distanceUpdate();
        }, 1000);
    }
    distanceUpdate() {
        this.setState({
            distance: this.state.distance + 0.01
        })
        setTimeout(this.distanceUpdate, 1000);
    }
    postCurrentRun = (elapsed) => {
        const { distance, pace, calories } = this.state;
        axios.get(`/api/addrun.php?distance=${distance}&time=${elapsed}&pace=${pace}&calories=${calories}`).then((resp) => {
            console.log('this is response:', resp);
        });
    }
    render() {
        const { elapsed, distance } = this.state;
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 mapContainer">
                    <div className="map"></div>
                    <div className="watchButtons">
                        <button onClick={this.start} className="btn btn-info">Start</button>
                        <button onClick={this.pause} className="btn btn-info">Pause</button>
                        <button onClick={this.reset} className="btn btn-info">Reset</button>
                    </div>
                </div>
                <div className="mapStatsContainer">
                    <div className="statContainer">
                        <div className="statTitle">Time</div>
                        <Stopwatch className="statResult" elapsed={elapsed} />
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Distance</div>
                        <Distance className="statResult" distance={distance} />
                        <button onClick={this.distanceIncrement} className="btn btn-info btn-sm">Increment</button>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Pace</div>
                        <div className="statResult">11:44</div>
                    </div>
                    <div className="statContainer">
                        <div className="statTitle">Calories Burned</div>
                        <div className="statResult">1,600 cal</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RunMap;
