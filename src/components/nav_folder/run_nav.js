import React, {Component} from 'react';
import './run_nav.scss';
import {NavLink} from 'react-router-dom';


class RunHeader extends Component {
   render(){
       return(
           <div className="headerContainer">
               <div className="row mapHeaderContainer">
                   {/* <div className="col-2 offset-5 logoContainer">
                       <img src={lightBulb} className='img-thumbnail'/>
                   </div> */}
               </div>
               <nav className="navbar navbar-expand bg-light navbar-light nav-border">
                   <ul className="navbar-nav nav-fill w-100">

                       <div className="nav-item">
                         <NavLink className="nav-link "to="/">Runs</NavLink>
                       </div>
                       <div className="nav-item">
                         <NavLink className="nav-link "to="/totalstats">Total Stats</NavLink>
                       </div>
                       <div className="nav-item">
                         <NavLink className="nav-link "to="/table">Activity Log</NavLink>
                       </div>
                   </ul>
               </nav>
           </div>
       )
   }
}

export default RunHeader;
