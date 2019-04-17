import React, {Component} from 'react';
// import './assets/css/app.scss';
import './run_map.scss';
import {Route, Switch} from 'react-router-dom';
import RunResult from './run_results';
import RunStats from './run_stats';



class RunMap extends Component {


    render(){
        return(
            <div className="mapBody">
                <div className="col-12 bg-primary">Header</div>
                <div className="col-12 bg-primary">Nav Bar</div>
                <div className="h-60 d-inline-block mapContainer">
                    <div className="map"></div>
                    <button className="bg-secondary startBtn">Start Button</button>
                </div>
                <div className="mapStatsContainer">
                    <div className="statContainer">Time</div>
                    <div className="statContainer">Distance</div>
                    <div className="statContainer">Pace</div>
                    <div className="statContainer">Calories Burned</div>
                </div>
                <Route path="/runmap/results" component={RunResult} />
                <Route path="/runmap/stats" component={RunStats} />
            </div>
        )
    }
}

export default RunMap;
