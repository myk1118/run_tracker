import React from 'react';
import MapNav from '../nav_folder/map_nav';

export default props => {
  return (
    <div className="currentRunStatsBody">
      <MapNav />
      <div className="float-right text-primary pt-3 pb-3">Total | Month | Week </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="w-25">Mile</th>
            <th className="w-25">Time</th>
            <th className="w-25">Heart Rate</th>
            <th className="w-25">Calories Burned</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>09:46</td>
            <td>145</td>
            <td>102</td>
          </tr>
          <tr>
            <td>2</td>
            <td>10:00</td>
            <td>152</td>
            <td>102</td>
          </tr>
          <tr>
            <td>3</td>
            <td>9:00</td>
            <td>157</td>
            <td>112</td>
          </tr>
          <tr>
            <td>4</td>
            <td>8:59</td>
            <td>161</td>
            <td>110</td>
          </tr>
          <tr>
            <td>5</td>
            <td>9:18</td>
            <td>164</td>
            <td>124</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}