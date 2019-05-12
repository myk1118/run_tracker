import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

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
          <div className="col-3 col-sm-4">
            <p className="last-run-date ">{lastRunDate} <span>@ {lastRunTime}</span></p>
          </div>
          <div className="col-3 col-sm-3">
            <p className="text-center">{latestRunInfo.distance} miles</p>
          </div>
          <div className="col-3 col-sm-3">
            <p className="text-center">{latestRunInfo.time} min</p>
          </div>
          <div className="col-3 col-sm-2">
            <NavLink to={`/results/${latestRunInfo.id}`}>
              <p className="right-arrow text-center"><i><FontAwesomeIcon icon="chevron-right" color="rgba(107, 185, 240, 1)"/></i></p>
            </NavLink>
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
              <p className="all-time-title">Total Calories:</p>
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
