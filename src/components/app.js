
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Runs from './runs/runs';
import TotalStats from './total_stats';
import Table from './table';
import ApiTest from './api_test';
import RunRoute from './run_map';
// import RunResult from './run_map/run_results';
// import RunStats from './run_map/run_stats';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './account/login/login';
import Signup from './account/sign_up/sign_up';
import Tutorial from './tutorial';
import RunHeader from './nav_folder/run_nav';
import Nav from './nav_folder/nav'

const App = (props) => {
    return(
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Runs}/>
          <Route path="/runmap" component={RunRoute}/>
          <Route path="/totalstats" component={TotalStats}/>
          <Route path="/table" component={Table} />
          {/* <Route path="/login" component={Login}/> */}
        </Switch>
      </div>
    )
};



{/* <ApiTest/> */}
export default App;
