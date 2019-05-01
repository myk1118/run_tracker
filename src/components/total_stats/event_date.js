import React, {Component, Fragment} from 'react';
import './total_stats.scss';
import { Modal, Button } from 'react-bootstrap';
import EventModal from './modal/modal';


class EventDate extends Component {

    render(){
    return(
      <Fragment>
      <div className="h-100 text-center align-self-center offset-2 col-1">
        <EventModal/>
      </div>
        <div className="col-1">
          <div className="col-sm-3 col-md-2">
          <div className="eventProgress" data-percentage="90">
            <span className="eventProgress-left">
              <span className="eventProgress-bar"></span>
            </span>
            <span className="eventProgress-right">
              <span className="eventProgress-bar"></span>
            </span>
          <div className="eventProgress-value">
          </div>
        </div>
        </div>
        </div>

      </Fragment>

    )}
}

export default EventDate;