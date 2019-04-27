import React, {Fragment} from 'react';
import './run_results.scss';


export default props =>{
    return(
        <Fragment>
        <div className="pieContainer col-md-6">
          <div className="offset-3 col-2 col-sm-3 col-md-6">
            <div className="progress" data-percentage="40">
              <span className="progress-left">
                <span className="progress-bar1"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar1"></span>
              </span>
              <div className="text-container">
              <div className="col-6 progress-value">
            Distance
            <div className="col-6 progress-text">1.38</div></div>
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar2"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar2"></span>
              </span>
            <div className="col-12 progress-value">
            Time
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-3 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar3"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar3"></span>
              </span>
            <div className="col-12 progress-value">
            Calories
            </div>
            </div>
            </div>
          </div>
          <div className="pieContainer col-md-6">
          <div className="offset-2 col-2 col-sm-3 col-md-2">
            <div className="progress" data-percentage="60">
              <span className="progress-left">
                <span className="progress-bar4"></span>
              </span>
              <span className="progress-right">
                <span className="progress-bar4"></span>
              </span>
            <div className="col-12 progress-value">
            Pace
            </div>
            </div>
            </div>
            </div>
            </Fragment>
    )
}