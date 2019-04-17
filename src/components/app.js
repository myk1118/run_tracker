import React from 'react';
import ApiTest from './api_test';
import RunMap from './run_map/run_map';
import RunResult from './run_map/run_results';
import RunStats from './run_map/run_stats';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Signup from './signup';
import Tutorial from './tutorial';

const App = () => {
    return(
      <div>
        <RunMap/>
        <RunResult/>
        <RunStats/>
        <Login />
        <Signup />
        <Tutorial />
      </div>
    )
};


{/* <ApiTest/> */}
export default App;
