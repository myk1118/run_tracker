import React, {Component} from 'react';
import axios from 'axios';

export default props => {

    const {longestRun, lastRunDate, averagePace, mostCalories, totalCalories,
      totalDistance, totalTime, lastRunTime, longestRunDate, highestCalorieDate,
      latestRunInformation} = props.personalBests;
    const latestRunInfo = {...props.personalBests.latestRunInformation};
    const totalTimeInMinutes = (totalTime/60).toFixed(2);

    return (
      <div className="personal-bests">
        <div className="row last-run">
          <p className="personal-bests-title">LAST RUN</p>
          <div className="col-3">
            <p className="">{lastRunDate} <span>{lastRunTime}</span></p>
          </div>
          <div className="col-3">
            <p className="">{lastRunDate} <span>{lastRunTime}</span></p>
          </div>
          <div className="col-3">
            <p className="">{lastRunDate} <span>{lastRunTime}</span></p>
          </div>
          <div className="col-3">
            <p className="">{lastRunDate} <span>{lastRunTime}</span></p>
          </div>
        </div>


        <div className="row bests-per-run">
          <p className="personal-bests-title">PERSONAL BESTS</p>
          <div className="longestRun col-6">
            <div>
              <p>Longest Run:</p>
              <div className="data-and-date-container">
                <p className="best">{longestRun} <span>{longestRun ? 'miles' : ''}</span></p>
                <p className="personal-bests-date">{longestRunDate}</p>
              </div>
            </div>
          </div>
          <div className="longestRun col-6">
            <div>
              <p>Calories Burned:</p>
              <div className="data-and-date-container">
                <p className="best">{mostCalories} <span>{mostCalories ? 'calories' : ''}</span></p>
                <p className="personal-bests-date">{highestCalorieDate}</p>
              </div>
            </div>
          </div>
        </div>


        <div className="row total-statistics">
          <p className="personal-bests-title">ALL-TIME</p>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title">Average Pace:</p>
              <div className="data-and-date-container">
                <p className="best">{averagePace}<span> {averagePace ? 'min/mile' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title">Total Calories Burned:</p>
              <div className="data-and-date-container">
                <p className="best">{totalCalories}<span> {mostCalories ? 'calories' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title">Total Miles</p>
              <div className="data-and-date-container">
                <p className="best">{totalDistance}<span> {totalDistance ? 'miles' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title">Total Minutes Ran</p>
              <div className="data-and-date-container">
                <p className="best">{totalTimeInMinutes}<span> {totalTimeInMinutes ? 'minutes' : ''}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
