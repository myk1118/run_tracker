import React, { Component } from 'react';
import Chart from './chart';
import RunHeader from '../nav_folder/run_nav';
import './total_stats.scss';
import PersonalBests from './personal_bests';
import axios from 'axios';
import EventDate from './event_date';
import PieChart from './piechart';
import EventModal from './modal/modal';

class TotalStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {},
      pieChartData: {},
      runCount: 0,
      personalBests: {},
    }
  }

  componentDidMount() {
    this.getChartData();
    this.getPersonalBests();
  }

  async getPersonalBests() {
    const bests = await axios.get('/api/personalbestquery.php');
    console.log('bests: ',bests.data)
    const { longestRun, lastRunDate, averagePace, mostCalories, totalCalories,
            totalDistance, totalTime, lastRunTime, longestRunDate, highestCalorieDate } = bests.data;
    this.setState({
      personalBests: {
        longestRun,
        lastRunDate,
        mostCalories,
        averagePace,
        totalCalories,
        totalDistance,
        totalTime,
        lastRunTime: lastRunTime.replace(/^0/, ' '),
        longestRunDate,
        highestCalorieDate,
      },
    })
  }

  getChartData() {
    axios.get('/api/get_table_data.php').then(resp => {
      const { tableItems } = resp.data;
      const dates = tableItems.reverse().map(item => item.date);
      const distances = tableItems.map(item => item.distance);
      const dataArray = [0, 0, 0, 0, 0];

      tableItems.forEach(run => {
        const { distance } = run
        if (distance > 8) {
          dataArray[4]++;
        } else if (distance > 6) {
          dataArray[3]++;
        } else if (distance > 4) {
          dataArray[2]++;
        } else if (distance > 2) {
          dataArray[1]++;
        } else {
          dataArray[0]++;
        }
      })

      this.setState({
        runCount: tableItems.length,
        pieChartData: {
          labels: ['Less than 2 mi', '2-4mi', '3-6mi', '6-8mi', '8 or more mi'],
          datasets: [
            {
              label: 'miles',
              fill: true,
              data: [...dataArray],
              borderColor: 'blue',
              backgroundColor: ['rgba(228,204,49,0.6)', 'rgba(138,17,129,0.6)', 'rgba(204,231,135,0.6)',
               'rgba(30,144,255, 0.6)', 'rgba(54,18,46,0.6)'],
            }
          ]
        },
        chartData: {
          labels: [...dates],
          datasets: [
            {
              label: 'miles',
              data: [...distances],
              borderColor: 'blue',
              backgroundColor: 'rgba(216,191,216,0.4)',
            }
          ]
        },
      })
    })
  }

  render() {
    const{chartData, pieChartData, runCount} = this.state;
    const {longestRun, lastRunDate, averagePace, mostCalories,
          totalCalories, totalDistance, totalTime, lastRunTime, longestRunDate, highestCalorieDate} = this.state.personalBests;
    console.log(this.state)
    return (
      <div className="total-stats">
        <RunHeader />
        <div className="totalStatsContainer container-fluid">
        <div className="first-row row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 col-12 ">
            <Chart chartData={chartData} runCount={runCount}/>
          </div>
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 col-12 ">
            <PersonalBests
              longestRun={longestRun}
              lastRunDate={lastRunDate}
              averagePace={averagePace}
              mostCalories={mostCalories}
              totalCalories={totalCalories}
              totalDistance={totalDistance}
              totalTime={totalTime}
              lastRunTime={lastRunTime}
              longestRunDate={longestRunDate}
              highestCalorieDate={highestCalorieDate}
            />
          </div>
        </div>
        <div className="second-row row">
          <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 col-12 text-center">
            <PieChart pieChartData={pieChartData} />
          </div>
          <div className="mt-1 col-xl-8 offset-xl-2 col-lg-10 offset-lg-1 col-12 text-center">
            <EventDate/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default TotalStats;
