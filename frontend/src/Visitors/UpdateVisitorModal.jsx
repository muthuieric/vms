import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { updateVisitor } from "../services/VisitorsService";

const UpdateVisitorModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateVisitor(props.visitor.id, {
      Name: e.target.Name.value,
      Id_number: e.target.Id_number.value,
      Phone: e.target.Phone.value,
      Email: e.target.Email.value,
      Red_flag: e.target.Red_flag.checked, // Include Red_flag field
    }).then(
      (result) => {
        alert(result);
        props.setUpdated(true);
      },
      (error) => {
        console.error("Failed to Update Visitor:", error);
        alert("Failed to Update Visitor");
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
            Update Visitor Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    required
                    defaultValue={props.visitor.Name}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group controlId="Id_number">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Id_number"
                    required
                    defaultValue={props.visitor.Id_number}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group controlId="Phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="Phone"
                    required
                    defaultValue={props.visitor.Phone}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    required
                    defaultValue={props.visitor.Email}
                    placeholder=""
                  />
                </Form.Group>

                <Form.Group controlId="Red_flag">
                  <Form.Check
                    type="checkbox"
                    label="Red Flag"
                    name="Red_flag"
                    defaultChecked={props.visitor.Red_flag}
                  />
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

export default UpdateVisitorModal;
