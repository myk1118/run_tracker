import React, {Component} from 'react';
import axios from 'axios';

export default props => {

    const {longestRun, lastRunDate, averagePace, mostCalories, totalCalories,
      totalDistance, totalTime, lastRunTime, longestRunDate, highestCalorieDate} = props;
    const totalTimeInMinutes = (totalTime/60).toFixed(2);

    return (
      <div className="personal-bests">
        <div className="row last-run">
          <p className="personal-bests-title">LAST RUN</p>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Last Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{lastRunDate} <span>{lastRunTime}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Average Pace:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{averagePace}<span> {averagePace ? 'min/mile' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div> */}
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
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Average Pace:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{averagePace}<span> {averagePace ? 'min/mile' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Total Calories Burned:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{totalCalories}<span> {mostCalories ? 'calories' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Total Miles</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{totalDistance}<span> {totalDistance ? 'miles' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Total Minutes Ran</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{totalTimeInMinutes}<span> {totalTimeInMinutes ? 'minutes' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}
