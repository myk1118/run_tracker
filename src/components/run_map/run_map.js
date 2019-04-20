import React, { Component } from 'react';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import MyMapComponent from './map';

class RunMap extends Component {
  constructor() {
    super();

    this.state = {
      currentLocation: {},
      startPos: null
    }
  }

  componentDidMount() {
    this.getCurrentLocation();
    // this.monitorUserLocation();
  }

    startWatch = () => {
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
          this.setState({
            currentLocation: {
              lat: parseFloat(position.coords.latitude),
              lng: parseFloat(position.coords.longitude)
            },
            startPos: position
          })
        })
      } else {
        console.log('Location not found')
      }
      // setInterval(() => {
      //     this.monitorUserLocation();
      // }, 3000);
    }

   // async getCurrentLocation() {
   //    if(navigator.geolocation) {
   //      const position = await navigator.geolocation.getCurrentPosition();
   //      let latitude = parseFloat(position.coords.latitude);
   //      let longitude = parseFloat(position.coords.longitude);
   //      console.log('longitude: ', longitude);
   //      console.log('latitude: ', latitude)
   //        // this.setState({
   //        //   currentLocation: {
   //        //     lat: parseFloat(position.coords.latitude),
   //        //     lng: parseFloat(position.coords.longitude)
   //        //   },
   //        //   startPos: position
   //        // })
   //      // })
   //    } else {
   //      console.log('Location not found')
   //    }
   //    // setInterval(() => {
   //    //     this.monitorUserLocation();
   //    // }, 3000);
   //  }

    monitorUserLocation() {
      navigator.geolocation.watchPosition(position => {
        console.log('latitude: ', position.coords.latitude);
        console.log('longitude: ',position.coords.longitude);
        const distanceTravled =  this.calculateDistance(this.state.startPos.coords.latitude, this.state.startPos.coords.longitude,
                                  position.coords.latitude, position.coords.longitude);
        console.log('distance traveled: ', distanceTravled)
      })
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // km
      let dLat = (lat2 - lat1) * Math.PI / 180;
      let dLon = (lon2 - lon1) * Math.PI / 180;
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let d = R * c;
        return d;
      }


    render() {
      console.log('state: ', this.state)
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 d-inline-block mapContainer">
                    <div className="map">
                      <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        coordinates = {this.state.currentLocation}
                      />
                    </div>
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
