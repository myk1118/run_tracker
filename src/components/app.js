import React from 'react';
// import '../assets/css/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Signup from './signup';
import Tutorial from './tutorial';


const App = () => (
    <div>
        <div className="app center">
        </div>
        {/* <Login /> */}
        <Signup />
        {/* <Tutorial /> */}
    </div>
);

export default App;
