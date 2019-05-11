import React, {Component} from 'react';
import axios from 'axios';

export default props => {

    const {longestRun, lastRunDate, averagePace, mostCalories, totalCalories, totalDistance, totalTime} = props;
    const totalTimeInMinutes = (totalTime/60).toFixed(2)
    return (
      <div className="personal-bests">
        <div className="row last-run">
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Last Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{lastRunDate}</td>
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
        personal bests
        <div className="row bests-per-run">
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Longest Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{longestRun} <span>{longestRun ? 'miles' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Calories Burned:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{mostCalories}<span> {mostCalories ? 'calories' : ''}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        totals
        <div className="row total-statistics">
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
