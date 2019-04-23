import React, { Component } from 'react';
import axios from 'axios';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import Distance from './distance';
import {NavLink} from 'react-router-dom';
import WatchBtns from './button.js';
import './run_map.scss';
import haversine from 'haversine';

class RunMap extends Component {
    constructor(props) {
    super(props);

    this.state = {
        currentLatLng: {
        lat: 33.6349179,
        lng: -117.74050049999998
        },
        startPos: null,
        watchId: null,
        map: null,
        prevCoords: null,
        status: 'stopped',
        start: null,
        elapsed: 0,
        distance: 0,
        pace: 100,
        calories: 100,
        watchId: null,
        distanceTraveled: 0,
        latitude: 33.6349179,
        longitude: -117.74050049999998,

    }

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this)
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.distanceIncrement = this.distanceIncrement.bind(this);
    this.distanceUpdate = this.distanceUpdate.bind(this);
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    postlatestMile(){
        const {distance} = this.state;
        if(distance && distance - Math.floor(distance) === 0){
            let{distance, mileage, time, runId} = this.state;
            axios.get(`/api/addpermile.php?run_id=${runId}&distance=${distance}&time=${time}&mileage=${mileage}`).then((resp) => {
                // console.log('this is response:', resp);
            })
        }
    }

//get the current location
    getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            console.log('geolocation coords: ',position.coords);
            this.setState({
              currentLatLng: {
                // ...prevState.currentLatLng,
                // ...this.state.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            })
          }
        )
      } else {
        error => console.log(error)
      }
    }

//when you click the button, start tracking
    startTracking = () => {
      console.log('distance tracked');
      const watchId = navigator.geolocation.watchPosition( position => {
        console.log('position changed. position coordinates: ', position.coords)
        this.monitorUserDistance(position);
      });
      this.setState({
        watchId: watchId
      })
    }
//when you click the stop button, stop tracking
    stopTracking = () => {
      console.log('tracking stopped');
      navigator.geolocation.clearWatch(this.watchId);
    }


//track distance traveled.  Updates everytime movement is tracked.
    monitorUserDistance = (position) => {
        const {lat, lng} = this.state.currentLatLng
        const distanceTraveled =  this.calcDistanceHaversine(lat, lng,
                                  position.coords.latitude, position.coords.longitude);
        console.log('Location is being monitored. distance traveled: ', distanceTraveled);
        let newDistance = this.state.distanceTraveled + distanceTraveled;
        this.setState({
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          distanceTraveled: newDistance,
          currentLatLng: {
            // ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })

    }


//convert distance to miles formula
    calcDistanceHaversine(lat1, lon1, lat2, lon2) {
      const start = {latitude: lat1, longitude: lon1};
      const end = {latitude: lat2, longitude: lon2};
      return haversine(start, end, {unit: 'mile'});
    }

    // calculateDistance(lat1, lon1, lat2, lon2) {
    //   const R = 6371; // km
    //   let dLat = (lat2 - lat1) * Math.PI / 180;
    //   let dLon = (lon2 - lon1) * Math.PI / 180;
    //   let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    //       Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //       let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //       let d = R * c;
    //     return d;
    //   }



    startWatch = () => {
        this.postlatestMile();
        this.refs.child.start();
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
            status: 'paused'
        })
    }
    reset() {
        const { elapsed } = this.state;
        if (this.state.status === 'paused') {
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
            // console.log('this is response:', resp);
        });
    }
    render() {
        const { elapsed, distance, status} = this.state;

        return (
            <div className="mapBody">
                <MapNav />

                <div className="h-60 d-inline-block mapContainer">
                    <div className="map">
                    <MyMapComponent
                        isMarkerShown
                        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        currentLocation = {this.state.currentLatLng}
                    />
                    </div>
                        <div className="buttonsContainer">
                        <WatchBtns status ={status} start={this.start} pause = {this.pause} reset = {this.reset}/>
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
                    <button onClick={this.startTracking}>Start Tracking. distance traveled: {this.state.distanceTraveled}</button>
                    <button onClick={this.stopTracking}>Stop Tracking</button>
            </div>
        )
    }
}

export default RunMap;
