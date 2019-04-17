import React, {Component} from 'react';
import './assets/css/app.scss';


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
            </div>
        )
    }
}

export default RunMap;