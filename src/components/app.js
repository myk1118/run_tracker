
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Runs from './runs/runs';
import TotalStats from './total_stats';
import Table from './total_stats/table';
import ApiTest from './api_test';
import RunRoute from './run_map';
// import RunResult from './run_map/run_results';
// import RunStats from './run_map/run_stats';
import Login from './account/login/login';
import Signup from './account/sign_up/sign_up';
import Tutorial from './tutorial';
import MapNav from './nav_folder/map_nav'

const App = (props) => {

  console.log(props)

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Runs} />
        <Route path="/runmap" component={RunRoute} />
        <Route path="/totalstats" component={TotalStats} />
        <Route path="/table" component={Table} />
        <Route path="/login" component={Login} />
      </Switch>
    </Fragment>
  )
};



{/* <ApiTest/> */ }
export default App;
