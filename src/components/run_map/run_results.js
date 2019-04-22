import React from 'react';
import RunHeader from '../nav_folder/run_nav';
import './run_results.scss';
import RunResults from './run_results';

export default props => {
    return (
        <div className="postRunBody">
            <RunHeader />
            <div className="postRunMap">
                <div className="mapContainer"></div>
            </div>
            <div className="postRunStats">
                <svg className="progress-ring col-5 offset-1">
                    <circle className="progressCircle"
                        stroke="blue"
                        strokeWidth="4"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"/>
                        <text x="45%" y="25%" textAnchor="middle" stroke="rgb(8, 5, 198)" strokeWidth="1px" dy=".3em">Total Time</text>
                </svg>
                <svg className="progress-ring col-5 ">
                    <circle className="progressCircle"
                        stroke="red"
                        strokeWidth="4"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"/>
                        <text x="45%" y="25%" textAnchor="middle" stroke="rgb(249, 28, 28)" strokeWidth="1px" dy=".3em">Total Distance</text>
                </svg>
                <svg className="progress-ring col-5 offset-1">
                    <circle className="progressCircle"
                        stroke="purple"
                        strokeWidth="4"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"/>
                        <text x="45%" y="25%" textAnchor="middle" stroke="rgb(146, 28, 249)" strokeWidth="1px" dy=".3em">Avg Pace</text>
                </svg>
                <svg className="progress-ring col-5 ">
                    <circle className="progressCircle"
                        stroke="orange"
                        strokeWidth="4"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"/>
                        <text x="45%" y="25%" textAnchor="middle" stroke="rgb(249, 124, 28)" strokeWidth="1px" dy=".3em">Calories Burned</text>
                </svg>
                {/* <div className="col-6">Total Time</div>
                <div className="col-6">Avg Pace</div>
                <div className="col-6">Total Calories Burned</div> */}
            </div>
            {/* <div className="graphContainer">
                <div className="graph">INSERT GRAPH HERE</div>
            </div> */}
        </div>
    )
}
