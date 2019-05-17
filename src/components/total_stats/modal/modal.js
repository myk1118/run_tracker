import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../total_stats.scss';

class EventModal extends Component {
  state = {
    show: false,
    event: '',
    date: ''
  };

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  postEvent = (e) => {
    e.preventDefault();

    const { event, date } = this.state;
    const data = {
      event: event,
      eventDate: date
    };

    axios.post('/api/add_event.php', data).then(() => {
      this.handleClose();
      this.props.history.push(`/totalstats?event=${data.event}&date=${data.eventDate}`);
      this.props.getEvent();
    });
  }
  render() {
    return (
      <Fragment>
        <Button className="countdownButton" variant="info" onClick={this.handleShow}>
          Add Target Event
          </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Target Event</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.postEvent}>
            <Modal.Body>
              <input
                value={this.state.event}
                onChange={this.handleInputChange}
                placeholder="Event Name"
                type="text"
                name="event"
                required
                className="eventName"
              />
              <br />
              <br />
              <input
                id="date"
                value={this.state.date}
                onChange={this.handleInputChange}
                value={this.state.date}
                type="date"
                name="date"
                required
              />
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="info" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Fragment>
    );
  }
}
export default withRouter(EventModal);
