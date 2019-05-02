import React, { Component } from 'react';
import RunHeader from '../nav_folder/run_nav';
import axios from 'axios';
import './total_stats.scss';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    }
  }

  // delete(item){
  //   const stats = this.state.stats.filter(i => i.id !== item.id)
  //   this.setState({stats})
  // }

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
        return (
          <tr key={row.id}>
            <td>{row.date}</td>
            <td>{row.distance}</td>
            <td>{row.time}</td>
            <td><button onClick={() => this.deleteRow(row.id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
          </tr>
        )
      })
      this.setState({
        stats: [...stats],
      })
    })
  }

  deleteRow = (id) => {
    console.log('deleted', id);
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
        return (
          <tr key={row.id}>
            <td>{row.date}</td>
            <td>{row.distance}</td>
            <td>{row.time}</td>
            <td><button className="btn btn-sm btn-outline-danger">Delete</button></td>
          </tr>
        )
      })
      this.setState({
        stats: [...stats]
      })
    })
  }

  filterByWeek = () => {

      axios.get('/api/get_table_data.php').then(resp => {
        console.log(resp.data)
        const { tableItems } = resp.data;
        const stats = tableItems.filter(row => {
          const currentDateTime = new Date().getTime();
          const runDateTime = new Date(row.date).getTime();
          const daysInMilliseconds = 10 * 86400000;
          return currentDateTime - runDateTime <= daysInMilliseconds
        }).map(row => {
          return (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.distance}</td>
              <td>{row.time}</td>
              <td><button className="btn btn-sm btn-outline-danger">Delete</button></td>
            </tr>
          )
        })
        this.setState({
          stats: [...stats]
        })
      })
    }

  render() {
    return (
      <div className="tableContainer">
        <RunHeader />
        <div className="last30days float-right text-primary pt-3 pb-3">
          <span onClick={this.displayActivityLogData} className="total">Total | </span>
          <span onClick={this.filterByMonth} className="month">Last 30 Days | </span>
          <span onClick={this.filterByWeek} className="week">Last 10 days</span>
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
