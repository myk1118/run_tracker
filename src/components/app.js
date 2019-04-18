
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Runs from './runs';
import TotalStats from './total_stats';
import Chart from './chart';
import ApiTest from './api_test';
import RunMap from './run_map/run_map';
import RunResult from './run_map/run_results';
import RunStats from './run_map/run_stats';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Signup from './signup';
import Tutorial from './tutorial';

const App = (props) => {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={Runs}/>
          <Route path="/runmap" component={RunMap}/>
          <Route path="/totalstats" component={TotalStats}/>
          <Route path="/chart" component={Chart} />
          {/* <Route path="/login" component={Login}/> */}
        </Switch>
      </div>
    )
};



{/* <ApiTest/> */}
export default App;
