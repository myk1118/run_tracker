import React, {Component} from 'react';


class Chart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div className="float-right text-primary pt-3 pb-3">Total | Month | Week</div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Distance</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>4-14-19</td>
            <td>3.9 miles</td>
            <td>24:36</td>
          </tr>
          <tr>
            <td>4-17-19</td>
            <td>3.3 miles</td>
            <td>38:34</td>
          </tr>
          <tr>
            <td>4-18-19</td>
            <td>3.4 miles</td>
            <td>4:34</td>
          </tr>
          <tr>
            <td>4-19-19</td>
            <td>6.4 miles</td>
            <td>54:34</td>
          </tr>
          <tr>
            <td>4-20-19</td>
            <td>4.5 miles</td>
            <td>22:34</td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }
}

export default Chart;
