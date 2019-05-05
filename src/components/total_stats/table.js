import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import './total_stats.scss';
import TableData from './tabledata';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      clickedElement: null,
    }
  }

  delete(item) {
    const newState = this.state.stats.slice();
    if (newState.indexOf(item) > -1) {
      newState.splice(newState.indexOf(item), 1);
      this.setState({ stats: newState })
    }
  }

  componentDidMount() {
    this.displayActivityLogData();
  }

  displayActivityLogData = () => {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;
      const stats = tableItems.map(row => {
        const {id, date, time, distance} = row;
        return (
          <tr key={id}>
            <TableData  id={id} distance={distance} date={date} time={time} deleteRow={this.deleteRow} />
          </tr>
        )
      })
      this.setState({
        stats: [...stats],
        clickedElement: 'total',
      })
    })
  }

  deleteRow = (id) => {
    axios.post('api/deleterun.php', { id: id }).then(() => {
      this.displayActivityLogData();
    })
  }

  filterByMonth = () => {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;
      const stats = tableItems.filter(row => {
        const currentDateTime = new Date().getTime();
        const runDateTime = new Date(row.date).getTime();
        const daysInMilliseconds = 30 * 86400000;
        return currentDateTime - runDateTime <= daysInMilliseconds
      }).map(row => {
        const {id, date, time, distance} = row;
        return (
          <tr key={id}>
            <TableData  id={id} distance={distance} date={date} time={time} deleteRow={this.deleteRow} />
          </tr>
        )
      })
      this.setState({
        stats: [...stats],
        clickedElement: 'month',
      })
    })
  }

  filterByWeek = () => {

      axios.get('/api/get_table_data.php').then(resp => {
        const { tableItems } = resp.data;
        const stats = tableItems.filter(row => {
          const currentDateTime = new Date().getTime();
          const runDateTime = new Date(row.date).getTime();
          const daysInMilliseconds = 10 * 86400000;
          return currentDateTime - runDateTime <= daysInMilliseconds
        }).map(row => {
          const {id, date, time, distance} = row;
          return (
            <tr key={id}>
              <TableData  id={id} distance={distance} date={date} time={time} deleteRow={this.deleteRow} />
            </tr>
          )
        })
        this.setState({
          stats: [...stats],
          clickedElement: 'week',
        })
      })
    }

  render() {
    return (
      <div className="tableContainer">
        <RunHeader />
        <div className="last30days float-right text-primary pt-3 pb-3">
          <span onClick={this.displayActivityLogData} className={`total ${this.state.clickedElement === 'total' ? 'bold' : ''}`}>Total </span>
          <span>|</span>
          <span onClick={this.filterByMonth} className={`month ${this.state.clickedElement === 'month' ? 'bold' : ''}`}> Last 30 Days </span>
          <span>|</span>
          <span onClick={this.filterByWeek} className={`week ${this.state.clickedElement === 'week'? 'bold' : ''}`}> Last 10 days</span>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Distance (mi)</th>
              <th scope="col">Time (h:m:s)</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.stats}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Chart;
