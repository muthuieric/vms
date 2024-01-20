import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import { addEmployee } from "../services/EmployeesService";

const AddEmployeeModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      Name: e.target.Name.value,
      Job_title: e.target.Job_title.value,
      Id_number: e.target.Id_number.value,
      Phone: e.target.Phone.value,
      Email: e.target.Email.value,
    }).then(
      (result) => {
        alert(result);
        props.setUpdated(true);
      },
      (error) => {
        console.error("Failed to Add Employee:", error);
        alert("Failed to Add Employee");
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
            Fill In Employee Information
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
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Job_title">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="Job_title"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Id_number">
                  <Form.Label>ID Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="Id_number"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="Phone"
                    required
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="Email"
                    required
                    placeholder=""
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

export default AddEmployeeModal;
