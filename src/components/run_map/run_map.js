import React, { Component, Fragment } from 'react';
import axios from 'axios';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';
import MyMapComponent from './map';
import apiKey from '../googlemap';
import Distance from './distance';
import WatchBtns from './button.js';
import './run_map.scss';
import '../total_stats/total_stats.scss';
import haversine from 'haversine';

class RunMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLatLng: {
                // lat: 33.6349179,
                // lng: -117.74050049999998
            },
            startingCoords: {},
            watchId: null,
            map: null,
            status: 'stopped',
            start: null,
            elapsed: 0,
            distance: 6,
            mileCounter: 1,
            pace: 100,
            calories: 0,
            renderPage: 'map',
            mileStats: [],
            previousTime: 0,
            distanceTraveled: 0,
            coordinateArray: [],
            run_id: null,
            weight: 0,

        }

        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this)
        this.update = this.update.bind(this);
        this.reset = this.reset.bind(this);
        // this.distanceIncrement = this.distanceIncrement.bind(this);
        // this.distanceUpdate = this.distanceUpdate.bind(this);
        this.countCalories = this.countCalories.bind(this);
    }

    getWeight() {
        axios.get('/api/getuser.php').then(resp =>{
            let {weight} = resp.data;
            weight = (parseFloat(weight)*.4536).toFixed(2);
            console.log('starting calories', resp);
            this.setState({
                weight
            });
        })
    }



    componentDidMount() {
        this.getGeoLocation();
        this.getWeight();
        // this.getMileData();
    }

//create a new run_id when the start button is clicked
    createNewRun = () => {
      const {lat, lng} = this.state.startingCoords;
      const data = {
        lat,
        lng
      };
      axios.post('/api/create_new_id.php', data).then(resp => {
        this.setState({
          run_id: resp.data.id
        })
      })
    }

//get the per mile data, send it to database, and set the state
    postlatestMile(miles) {
        // const { distance, distanceTraveled, mileCounter } = this.state;
        // if (distanceTraveled && distanceTraveled - mileCounter >= 0) {
        // if (distanceTraveled && distanceTraveled - Math.floor(distanceTraveled) === 0) {
            let { previousTime, elapsed, mileCounter, run_id, distanceTraveled } = this.state;
            const data = {
                run_id,
                time: Math.round((elapsed - previousTime)/1000),
                // time: Math.round((elapsed/1000)),
                mileage: miles,
                // miles_remaining: distanceTraveled - mileCounter - 1
            }
            axios.post(`/api/addpermile.php`, data).then((resp) => {
                mileCounter = mileCounter + 1;
                this.setState({
                    mileCounter,
                    previousTime: elapsed
                })
            }).then(() => {
              this.getMileData();
            })
        // }
    }

//display per mile data to the table
    getMileData() {
      const {run_id} = this.state;
      if(run_id){
        axios.post('/api/getpermile.php', {run_id}).then(resp => {
            const { mileTime } = resp.data;
            const mileStats = mileTime.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.mile}</td>
                        <td>{item.time}</td>
                    </tr>
                )
            });
            this.setState({
                mileStats: [...mileStats]
            })
        })
      }
    }

//current run data is sent to database when the user ends the run
    postCurrentRun = (elapsed) => {
        const { distanceTraveled, pace, calories, run_id } = this.state;
        const data = {
            distance: distanceTraveled,
            time: Math.floor(elapsed/1000),
            pace: pace,
            calories: calories,
            run_id
        }
        axios.post(`/api/addrun.php`, data);
    }

    //get the current location
    getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( position => {
            this.setState({
              currentLatLng: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              coordinateArray: [...this.state.coordinateArray, {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }],
              startingCoords: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
            })
          }
        )
      } else {
        error => console.log(error)
      }
    }

    // startWatch = () => {
    //     this.refs.child.start();
    // }


    geoLocationInterval = () => {
      navigator.geolocation.getCurrentPosition(position => {
         this.monitorUserDistance(position.coords.latitude + (this.state.coordinateArray.length/20000), position.coords.longitude + (this.state.coordinateArray.length/20000));
      })

    }

//when you click the button, start tracking
    startTracking = () => {
      const watchId = setInterval(this.geoLocationInterval, 200);
      this.setState({
        watchId: watchId
      })
    }

    // startTracking = () => {
    //   const watchId = navigator.geolocation.watchPosition(position => {
    //     this.monitorUserDistance(position.coords.latitude, position.coords.longitude);
    //   }, error => {
    //   }, {enableHighAccuracy: true})
    //     this.setState({
    //       watchId: watchId
    //     })
    // }
//when you click the stop button, stop tracking
    stopTracking = () => {
      // navigator.geolocation.clearWatch(this.state.watchId);
      clearInterval(this.state.watchId);
    }
    stopCalorie = () => {
        clearTimeout(this.countCalories);
    }


    //track distance traveled.  Updates everytime movement is tracked.
    monitorUserDistance = (newLatitude, newLongitude) => {
        const { lat, lng } = this.state.currentLatLng
        const distanceCalculation = this.calcDistanceHaversine(lat, lng, newLatitude, newLongitude);
        let newDistance = this.state.distanceTraveled + distanceCalculation;
        const { distance, distanceTraveled, mileCounter } = this.state;
        if (distanceTraveled && distanceTraveled - mileCounter >= 0) {
          this.postlatestMile(mileCounter);
        }
        if (distanceCalculation !== 0) {
            this.setState({
                coordinateArray: [...this.state.coordinateArray, {
                    lat: newLatitude,
                    lng: newLongitude
                }],
                distanceTraveled: newDistance,
                currentLatLng: {
                    lat: newLatitude,
                    lng: newLongitude
                }
            })
        } else {
            this.setState({
                distanceTraveled: newDistance,
                currentLatLng: {
                    lat: newLatitude,
                    lng: newLongitude
                }
            })
        }
    }

    //convert distance to miles formula
    calcDistanceHaversine(lat1, lon1, lat2, lon2) {
        const start = { latitude: lat1, longitude: lon1 };
        const end = { latitude: lat2, longitude: lon2 };
        return haversine(start, end, { unit: 'mile' });
    }





    startWatch = () => {
        this.postlatestMile();
        this.refs.child.start();
    }


    start() {
        console.log('calories')
      if(!this.state.run_id){
        this.createNewRun()
      }
      this.startTracking();
      const { start, elapsed, calories, weight } = this.state;
      let newStart = new Date().getTime();
      let newCalories = calories;
      if (start) {
        newStart -= elapsed;
      }
      this.setState({
        status: 'running',
        start: newStart,
      });
      setTimeout(() => {
        this.update();
      }, 10);
      setTimeout(() => {
        this.countCalories();
      }, 1000);
      // this.distanceIncrement();
    }

    pause() {
        this.stopTracking();
        this.stopCalorie();
        this.setState({
            status: 'paused'
        })
    }

    reset() {
        const { elapsed, distanceTraveled, mileCounter } = this.state;
        // const remainingDistance = distanceTraveled - (mileCounter - 1);
        if (this.state.status === 'paused') {
            this.postlatestMile(distanceTraveled);
            this.postCurrentRun(elapsed);
            this.setState({
                status: 'stopped',
                start: null,
                elapsed: 0
            });
        }
    }

    clickMap = () => {
        this.setState({
            renderPage: 'map'
        })
    }

    clickMiles = () => {
        this.setState({
            renderPage: 'Miles'
        })
    }

    update() {
        const { status, start, calories, weight } = this.state;
        if (status === 'running') {
            this.setState({
                elapsed: new Date().getTime() - start,
            })
            setTimeout(this.update, 10);
        }
    }

    //MET 6 = 15min mile   8.3 12min mile  9.8 10min mile
    //  11.8 7min mile    12.3  7min mile
    //12.8 6.5min mile   16.0 5.5min mile

    countCalories() {
        const { status, calories, weight, elapsed, distanceTraveled } = this.state;
        if (status === 'running') {
            const paceInMinutes = isNaN(Math.trunc(elapsed/(60000*distanceTraveled))) ? 0 : Math.trunc(elapsed/(60000*distanceTraveled));
            console.log('pace in minutes', paceInMinutes)
            let metBurn = 0;
            if(paceInMinutes >= 15){
                metBurn = 6
            } else if(paceInMinutes >= 12) {
                metBurn = 8.3
            }else if(paceInMinutes >= 10) {
                metBurn = 9.8
            }else if(paceInMinutes >= 8) {
                metBurn = 11.8
            }else if(paceInMinutes >= 7) {
                metBurn = 12.3
            }else if(paceInMinutes >= 6) {
                metBurn = 12.8
            } else {
                metBurn = 16
            }
            let updateCalories = (((weight * metBurn)/3600) + calories);

            this.setState({
                calories: updateCalories
            })
            setTimeout(this.countCalories, 1000);
        }
        if (status === 'paused'){
            clearTimeout(this.countCalories);
        }
    }



    // distanceIncrement() {
    //     setTimeout(() => {
    //         this.distanceUpdate();
    //     }, 1000);
    // }
    //
    // distanceUpdate() {
    //     // debugger;
    //     let { distance } = this.state;
    //     // // distance =
    //     this.setState({
    //         distance: (parseFloat(distance) + 0.01).toFixed(2)
    //     })
    //     setTimeout(this.distanceUpdate, 200);
    //     this.postlatestMile();
    // }



    renderPage=()=>{
        const { elapsed, distanceTraveled, status, renderPage, calories } = this.state;
        // const paceInMinutes = isNaN(Math.trunc(elapsed/(60000*distanceTraveled))) ? 0 : Math.trunc(elapsed/(60000*distanceTraveled));
        const paceInMinutes = isFinite(Math.trunc(elapsed/(60000*distanceTraveled))) ? Math.trunc(elapsed/(60000*distanceTraveled)) : 0;
        // const paceInSeconds = isNaN(((elapsed/(60000*distanceTraveled) - paceInMinutes)*60).toFixed(0)) ? '00' : ((elapsed/(60000*distanceTraveled) - paceInMinutes)*60).toFixed(0);
        const paceInSeconds = isFinite(((elapsed/(60000*distanceTraveled) - paceInMinutes)*60).toFixed(0)) ? ((elapsed/(60000*distanceTraveled) - paceInMinutes)*60).toFixed(0) : '00';
        if(renderPage === 'map'){
            return(
                <Fragment>
                <div className="h-60 mapContainer">
                <div className="map">
                    <MyMapComponent
                        isMarkerShown
                        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtWT-ZM2l21GJnuT7cjNZYmbQa0flwL6c&v=3.exp&libraries=geometry,drawing,places"
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
                        loadingElement={<div className="loading-element" style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        currentLocation={this.state.currentLatLng}
                        coordinateArray = {this.state.coordinateArray}
                    />
                </div>
                <div className="runmapButtonsContainer">
                    <WatchBtns status={status}
                        run_id={this.state.run_id}
                        start={this.start}
                        pause={this.pause}
                        reset={this.reset} />
                </div>
            </div>
            <div className="mapStatsContainer">
                <div className="statContainer">
                    <div className="statTitle">Time</div>
                    <Stopwatch className="statResult" elapsed={elapsed} />
                </div>
                <div className="statContainer">
                    <div className="statTitle">Distance</div>
                    <Distance className="statResult" distance={distanceTraveled.toFixed(2)} />
                    {/* <button onClick={this.distanceIncrement} className="btn btn-info btn-sm">Increment</button> */}
                </div>
                <div className="statContainer">
                    <div className="statTitle">Average Pace (min/mi)</div>
                    <div className="statResult">{paceInMinutes}:{paceInSeconds}</div>
                </div>
                <div className="statContainer">
                    <div className="statTitle">Calories Burned</div>
                    <div className="statResult">{calories.toFixed(2)}</div>
                </div>
            </div>
            </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="float-right text-primary pt-3 pb-3">Total | Month | Week </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="w-25">Mile</th>
                                <th className="w-25">Time</th>
                                {/* <th className="w-25">Heart Rate</th>
                                <th className="w-25">Calories Burned</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.mileStats}
                        </tbody>
                    </table>
                </Fragment>
            )
        }
    }

    render() {
      const {distanceTraveled} = this.state;
        return (
            <div className="mapBody">
                <MapNav clickMap = {this.clickMap} clickMiles={this.clickMiles} />
                {this.renderPage()}
            </div>
        )
    }
}

export default RunMap;
