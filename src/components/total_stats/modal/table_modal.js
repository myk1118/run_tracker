import React, {Component, Fragment} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../total_stats.scss';

class TableModal extends Component {
    state = {
        show: false,
      };


    handleClose=()=> {
      this.setState({ show: false });
    }

    handleShow=()=> {
      this.setState({ show: true });
    }

    deleteRun=(e)=>{
        const {id} = this.props
        e.preventDefault();
        this.props.deleteRow(id);
    }


    render() {
      return (
        <Fragment>
          <Button variant="none" className="btn btn-sm btn-outline-danger" onClick={this.handleShow}>
            Delete
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete run?</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.deleteRun}>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="danger" type="submit" >
                Delete
              </Button>
            </Modal.Footer>
            </form>
          </Modal>
        </Fragment>
      );
    }
}
export default TableModal;
