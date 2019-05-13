import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default props => {

    const {longestRun, lastRunDate, averagePace, mostCalories, totalCalories,
          totalDistance, totalTime, lastRunTime, longestRunDate, highestCalorieDate,
          latestRunInformation, longestRunId, highestCalorieId } = props.personalBests;
    const latestRunInfo = {...props.personalBests.latestRunInformation};

    const rightArrow = !latestRunInfo.id ? '' : <FontAwesomeIcon  icon="chevron-right" color="rgba(107, 185, 240, 1)"/>;



    return (
      <div className="personal-bests">
        <div className="row last-run">
          <p className="personal-bests-title">LAST RUN</p>
          <div className="col-3 col-sm-4">
            <p className="last-run-date ">{lastRunDate} <span>{lastRunDate ? `@ ${lastRunTime}` : ''}</span></p>
          </div>
          <div className="col-3 col-sm-3">
            <p className="text-center">{latestRunInfo.distance} {latestRunInfo.distance ? 'miles' : ''}</p>
          </div>
          <div className="col-3 col-sm-3">
            <p className="text-center">{latestRunInfo.time} {latestRunInfo.time ? 'min' : ''}</p>
          </div>
          <div className="col-3 col-sm-2">
            <NavLink to={`/results/${latestRunInfo.id}`}>
              <p className="right-arrow text-center"><i>{rightArrow}</i></p>
            </NavLink>
          </div>

        </div>


        <div className="row bests-per-run">
          <p className="personal-bests-title">PERSONAL BESTS</p>
          <div className="col-6">
            <div>
              <p>Longest Run:</p>
              <div className="data-and-date-container">
                <p className="best">{longestRun} <span>{longestRun ? 'miles' : ''}</span></p>
                <p className="personal-bests-date">{longestRunDate}
                  <NavLink to={`/results/${longestRunId}`}>
                    <i className="right-arrow">{rightArrow}</i>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div>
              <p>Calories Burned:</p>
              <div className="data-and-date-container">
                <p className="best">{mostCalories} <span>{mostCalories ? 'cal' : ''}</span></p>
                <p className="personal-bests-date">{highestCalorieDate}
                  <NavLink to={`/results/${highestCalorieId}`}>
                    <i className="right-arrow">{rightArrow}</i>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>


        <div className="row total-statistics">
          <p className="personal-bests-title">ALL-TIME</p>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title"><i><FontAwesomeIcon icon="stopwatch" color="rgba(130, 82, 0.8)"/></i> Average Pace:</p>
              <div>
                <p className="best">{averagePace}<span> {averagePace ? 'min/mile' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title"><i><FontAwesomeIcon icon="fire" color="rgba(226,88,34,0.8)"/></i> Total Calories:</p>
              <div>
                <p className="best">{totalCalories}<span> {mostCalories ? 'cal' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title"><i><FontAwesomeIcon icon="road" color="grey"/></i> Total Miles:</p>
              <div>
                <p className="best">{totalDistance}<span> {totalDistance ? 'miles' : ''}</span></p>
              </div>
            </div>
          </div>
          <div className="all-time col-6">
            <div>
              <p className="all-time-title"><i><FontAwesomeIcon icon="clock" color="rgba(107, 185, 240, 1)"/></i> Total Minutes:</p>
              <div>
                <p className="best">{totalTime}<span> {totalTime ? 'min' : ''}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
