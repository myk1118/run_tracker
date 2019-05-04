import React, {Component} from 'react';
import axios from 'axios';

export default props => {

    const {longestRun, lastRunDate, averagePace, mostCalories} = props;
    return (
      <div className="personal-bests">
        <div className="row">
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Longest Run:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{longestRun} <span>miles</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Average Pace:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{averagePace}<span> min per mile</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <table className="table table-hover">
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
          <div className="col-6">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Most Calories Burned:</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="best">{mostCalories}<span> calories</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}
