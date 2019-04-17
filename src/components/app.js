import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/app.scss';
import Runs from './runs';
import TotalStats from './total_stats';
import Chart from './chart';


const App = () => (
    <div>
      <Runs />
      <TotalStats />
      <Chart />
    </div>
);

export default App;
