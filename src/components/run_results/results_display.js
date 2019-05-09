import React, {Fragment} from 'react';
import './run_results.scss';

export default props => {

  const {minutesSecondsRan, distance, pace, calories} = props;
  const paceWithInfinityCheck = /Infinity/.test(pace) ? pace.replace(/Infinity/gi, '0') : pace;
  const paceWithNaNCheck = /NaN/.test(pace) ? paceWithInfinityCheck.replace(/NaN/gi, '0') : pace;
  return (
    <Fragment>
      <div className="row">
        <div className="col-6 ">
          <p className="run-title">Duration (min:sec)</p>
          <p>{minutesSecondsRan}</p>
        </div>
        <div className="col-6 ">
          <p className="run-title">Distance</p>
          <p>{distance} miles</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6 ">
          <p className="run-title">Avg Pace (min/mile)</p>
          <p>{paceWithNaNCheck}</p>
        </div>
        <div className="col-6 ">
          <p className="run-title">Calories</p>
          <p>{calories}</p>
        </div>
      </div>
    </Fragment>
  )
}
