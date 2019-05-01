import React, {Component, Fragment} from 'react';
import { Modal, Button } from 'react-bootstrap';




class EventModal extends Component {
    state = {
        show: false,
        event: '',
        date: ''
      };
    
  
    handleClose=()=> {
      this.setState({ show: false });
    }
  
    handleShow=()=> {
      this.setState({ show: true });
    }
    handleInputChange=(event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }
    render() {
      console.log('state', this.state);
      return (
        <Fragment>
          <Button variant="primary" onClick={this.handleShow}>
            Target Event
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Target Event</Modal.Title>
            </Modal.Header>
            <form>
            <Modal.Body>
            
            <input
                value={this.state.event}
                onChange={this.handleInputChange}
                placeholder="Event Name"
                type="text"
                name="event"
                required
            />
            <br/>
            <br/>
            <input
                id="date"
                value={this.state.date}
                onChange={this.handleInputChange}
                value="2019-01-01"
                type="date"
                name="date"
                required
            />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
            </form>
          </Modal>
        </Fragment>
      );
    }
}
export default EventModal;