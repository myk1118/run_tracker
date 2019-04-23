import React, { Component } from 'react';
import axios from 'axios';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import Distance from './distance';
import { NavLink } from 'react-router-dom';
import WatchBtns from './button.js';
import './run_map.scss';

class RunMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLatLng: {
                lat: 33,
                lng: -117
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
        }

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this)
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        this.distanceIncrement = this.distanceIncrement.bind(this);
        this.distanceUpdate = this.distanceUpdate.bind(this);
    }

    postlatestMile() {
        const { distance } = this.state;
        if (distance && distance - Math.floor(distance) === 0) {
            let { distance, mileage, time, runId } = this.state;
            axios.get(`/api/addpermile.php?run_id=${runId}&distance=${distance}&time=${time}&mileage=${mileage}`).then((resp) => {
                console.log('this is response:', resp);
            })
        }
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log('geolocation coords: ', position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
        } else {
            error => console.log(error)
        }
    }

    startWatch = () => {
        this.postlatestMile();
        this.refs.child.start();
    }

    // monitorUserLocation() {
    //     navigator.geolocation.watchPosition(position => {
    //         console.log('latitude: ', position.coords.latitude);
    //         console.log('longitude: ', position.coords.longitude);
    //         const distanceTravled = this.calculateDistance(this.state.startPos.coords.latitude, this.state.startPos.coords.longitude,
    //             position.coords.latitude, position.coords.longitude);
    //         console.log('distance traveled: ', distanceTravled)
    //     })
    // }
    // monitorUserLocation = () => {
    //     navigator.geolocation.watchPosition(position => {
    //         console.log('latitude: ', position.coords.latitude);
    //         console.log('longitude: ', position.coords.longitude);
    //         const distanceTravled = this.calculateDistance(this.state.latitude, this.state.longitude,
    //             position.coords.latitude, position.coords.longitude);
    //         console.log('distance traveled: ', distanceTravled)
    //     })
    // }

    // calculateDistance(lat1, lon1, lat2, lon2) {
    //     const R = 6371; // km
    //     let dLat = (lat2 - lat1) * Math.PI / 180;
    //     let dLon = (lon2 - lon1) * Math.PI / 180;
    //     let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //     let d = R * c;
    //     return d;
    // }

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
        this.distanceIncrement();
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
                elapsed: 0,
                distance: 0
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
        }, 10);
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
        const { elapsed, distance, status } = this.state;
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 mapContainer">
                    <div className="map">
                        <MyMapComponent
                            isMarkerShown
                            // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            currentLocation={this.state.currentLatLng}
                        />
                    </div>
                    <div className="buttonsContainer">
                        <WatchBtns status={status}
                            start={this.start}
                            pause={this.pause}
                            reset={this.reset}
                            distanceIncrement={this.distanceIncrement} />
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
                        {/* <button onClick={this.distanceIncrement} className="btn btn-info btn-sm">Increment</button> */}
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
