import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addTm } from '../../services/TmsService';

const AddTmModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTm(e.target)
      .then(
        (result) => {
          alert(result);
          props.setUpdated(true);
        },
        (error) => {
          console.error('Failed to Add Tm:', error);
          alert('Failed to Add Tm');
        }
      );
  };

  return (
    <div className="container">
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Fill In Tm Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="Name" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="Phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="number" name="Phone" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="Email" required placeholder="" />
                </Form.Group>
                <Form.Group>
                  <p></p>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTmModal;