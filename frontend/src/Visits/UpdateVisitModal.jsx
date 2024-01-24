import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { updateVisit } from "../services/VisitsService";

const UpdateVisitModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateVisit(props.visit.id, {
      visitor: e.target.name.value,
      host: e.target.host.value,
      visit_type: e.target.visit_type.value,
      purpose: e.target.purpose.value,
      checkin: e.target.checkin.value,
      checkout: new Date().toISOString(),
      // checkout: e.target.checkout.value,
    }).then(
      (result) => {
        alert(result);
        props.setUpdated(true);
      },
      (error) => {
        console.error("Failed to Update Visit:", error);
        alert("Failed to Update Visit");
      }
    );
  };

  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Visit Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Visitor's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    defaultValue={props.visit.visitor}
                    placeholder=""
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="host">
                  <Form.Label>Host</Form.Label>
                  <Form.Control
                    type="text"
                    name="host"
                    required
                    defaultValue={props.visit.host}
                    placeholder=""
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="visit_type">
                  <Form.Label>Visit Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="visit_type"
                    required
                    defaultValue={props.visit.visit_type}
                  >
                    <option value="Contractor">Contractor</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Visitor">Visitor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    as="select"
                    name="purpose"
                    required
                    defaultValue={props.visit.purpose}
                  >
                    <option value="Personal">Personal</option>
                    <option value="Official">Official</option>
                  </Form.Control>
                </Form.Group>
                {/* <Form.Group controlId="checkin">
                  <Form.Label>Checkin</Form.Label>
                  <Form.Control
                    type="text"
                    name="checkin"
                    required
                    defaultValue={props.visit.checkin}
                    placeholder=""
                    readOnly
                  />
                </Form.Group> */}
                {/* <Form.Group controlId="checkout">
                  <Form.Label>Checkout</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="checkout"
                    defaultValue={props.visit.checkout}
                  />
                </Form.Group> */}
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

export default UpdateVisitModal;
