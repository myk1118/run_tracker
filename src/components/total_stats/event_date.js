import React, { Component, Fragment } from 'react';
import './total_stats.scss';
import EventModal from './modal/modal';
import Countdown from './countdown.js';
import axios from 'axios';

class EventDate extends Component {
  state = {
    eventName: '',
    eventDate: ''
  }

  componentDidMount() {
    this.getEvent();
  }
  getEvent = () => {
    axios.get('/api/get_event.php').then(resp => {
      const { eventDay, eventName } = resp.data['1'];
      let { date } = eventDay;
      let newDate = new Date(date);
      this.setState({
        eventName,
        eventDate: newDate
      })
    })
  }

  render() {
    const { eventName, eventDate } = this.state;
    return (

      <Fragment>
        <h3 className="title">{eventName}</h3>
        <Countdown date={`${eventDate}`} />
        <div className="col">
          <EventModal getEvent={this.getEvent} />
        </div>
      </Fragment>

    )
  }
}

export default EventDate;
