import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { addVisit } from '../../services/VisitsService';

const AddVisitModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addVisit({
      visitor: e.target.name.value,
      host: e.target.host.value, // Assuming you have an input field with the name "Host"
      visit_type: e.target.visit_type.value, // Assuming you have an input field with the name "VisitType"
      purpose: e.target.purpose.value,
      checkin: new Date().toISOString(), // You may need to adjust how you handle the checkin time
      checkout: null, // Assuming checkout is not provided during the creation
    })
      .then(
        (result) => {
          alert(result);
          props.setUpdated(true);
        },
        (error) => {
          console.error('Failed to Add Visit:', error);
          alert('Failed to Add Visit');
        }
      );
  };

  return (
    <div className="container">
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Fill In Visit Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Visitor's Name</Form.Label>
                  <Form.Control type="text" name="name" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="host">
                  <Form.Label>Host</Form.Label>
                  <Form.Control type="text" name="host" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="visit_type">
                   <Form.Group controlId="visit_type">
                  <Form.Label>Visit Type</Form.Label>
                  <Form.Control as="select" name="visit_type" onChange={(e) => setFormData({ ...formData, visit_type: e.target.value })} required>
                    <option value="">Select Visit Type</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Visitor">Visitor</option>
                  </Form.Control>
                </Form.Group>
                  <Form.Label>Visit Type</Form.Label>
                  <Form.Control type="text" name="visit_type" required placeholder="" />
                </Form.Group>
                <Form.Group controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control type="text" name="purpose" required placeholder="" />
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

export default AddVisitModal;
