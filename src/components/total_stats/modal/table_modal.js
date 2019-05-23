import React, {Component, Fragment} from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import '../total_stats.scss';

class TableModal extends Component {
    state = {
        show: false,
        deleteSuccess: true,
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
        axios.post('api/deleterun.php', { id: id }).then((resp) => {
          if(!resp.data.success) {
            this.setState({
              deleteSuccess: false,
            })
          } else {
            this.setState({
              show: false
            })
            this.props.displayActivityLogData();
          }
        })
    }


    render() {
      const {deleteSuccess} = this.state;
      const deleteMessage = deleteSuccess ? 'Are you sure you want to delete run?' : 'You cannot delete pre-set guest runs';

      return (
        <Fragment>
          <Button variant="none" className="btn btn-sm btn-outline-danger" onClick={this.handleShow}>
            Delete
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{deleteMessage}</Modal.Title>
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