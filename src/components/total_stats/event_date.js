import React, { Component, Fragment } from 'react';
import './total_stats.scss';
// import { Modal, Button } from 'react-bootstrap';
import EventModal from './modal/modal';
import Countdown from './countdown.js';
import axios from 'axios';


class EventDate extends Component {
  state = {
    eventName: '',
    eventDate: ''
  }
  
  componentDidMount(){
    this.getEvent();
  }
  getEvent=()=>{
    axios.get('/api/get_event.php').then(resp=>{
      console.log('event resp', resp);
      const {eventDay, eventName} = resp.data['1'];
      let {date} = eventDay;
      let newDate = new Date(date);
      this.setState({
        eventName,
        eventDate: newDate
      })
    })
  }
  
  render() {
    // debugger;
    console.log('state', this.state);
    const {eventName, eventDate} = this.state;
    return (
      
      <Fragment>
        <div className="col-8 text-center align-self-center offset-2 col-1">
          <EventModal />
        </div>
        <h3 className="title">{eventName} in:</h3>
        <Countdown date={`${eventDate}`} />
      </Fragment>

    )
  }
}

export default EventDate;