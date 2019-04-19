import React, { Component } from 'react';
import MapNav from '../nav_folder/map_nav';
import Stopwatch from './stopwatch';

class RunMap extends Component {

    render() {
        return (
            <div className="mapBody">
                <MapNav />
                <div className="h-60 d-inline-block mapContainer">
                    <div className="map"></div>
                    <button className="btn btn-info">Start</button>
                    <button className="btn btn-info">Pause</button>
                    <button className="btn btn-info">Stop</button>
                </div>
                <div className="mapStatsContainer">
                    <div className="statContainer">
                        Time
                        <Stopwatch />
                    </div>
                    <div className="statContainer">Distance</div>
                    <div className="statContainer">Pace</div>
                    <div className="statContainer">Calories Burned</div>
                </div>
            </div>
        )
    }
}
export default RunMap;
