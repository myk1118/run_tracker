import React from 'react';
import RunHeader from '../nav_folder/run_nav';

export default props => {
    return (
        <div className="postRunBody">
            <RunHeader />
            <div className="bg-secondary">Header</div>
            <div className="bg-secondary">Nav Bar</div>
            <div className="postRunMap">
                <div className="mapContainer"></div>
            </div>
            <div className="postRunStats">
                <div className="col-6">Total Distance</div>
                <div className="col-6">Total Time</div>
                <div className="col-6">Avg Pace</div>
                <div className="col-6">Total Calories Burned</div>
            </div>
            <div className="graphContainer">
                <div className="graph">INSERT GRAPH HERE</div>
            </div>
        </div>
    )
}
