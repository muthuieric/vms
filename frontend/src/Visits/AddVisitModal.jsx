import React, { useState, useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { addVisit } from "../services/VisitsService";
import { getVisitors } from "../services/VisitorsService";
import { getEmployees } from "../services/EmployeesService"; // Import the service function for fetching employees

const AddVisitModal = (props) => {
  const [visitorNames, setVisitorNames] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch visitor names when the component mounts
    getVisitors()
      .then((data) => {
        // Transform the data to the format required by react-select
        const options = data.map((visitor) => ({
          value: visitor.Name,
          label: `${visitor.id} - ${visitor.Name} - ${visitor.Red_flag}`,
        }));
        setVisitorNames(options);
      })
      .catch((error) => {
        console.error("Failed to fetch visitor names:", error);
      });

    // Fetch employee names when the component mounts
    getEmployees()
      .then((data) => {
        const options = data.map((employee) => ({
          value: employee.Name,
          label: `${employee.id} - ${employee.Name} - ${employee.Job_title}`,
        }));
        setEmployeeNames(options);
      })
      .catch((error) => {
        console.error("Failed to fetch employee names:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVisit({
      visitor: selectedVisitor ? selectedVisitor.value : e.target.visitor.value,
      host: selectedEmployee ? selectedEmployee.value : e.target.host.value,
      visit_type: e.target.visit_type.value,
      purpose: e.target.purpose.value,
      checkin: new Date().toISOString(),
      checkout: null,
    }).then(
      (result) => {
        alert(result);
        props.setUpdated(true);
      },
      (error) => {
        console.error("Failed to Add Visit:", error);
        alert("Failed to Add Visit");
      }
    );
  };

  const handleSelectVisitorChange = (selectedOption) => {
    setSelectedVisitor(selectedOption);
  };

  const handleSelectEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
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
            Fill In Visit Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="visitor">
                  <Form.Label>Visitor's Name</Form.Label>
                  <Select
                    options={visitorNames}
                    value={selectedVisitor}
                    onChange={handleSelectVisitorChange}
                    placeholder="Select Visitor's Name"
                  />
                </Form.Group>
                <Form.Group controlId="host">
                  <Form.Label>Host (Employee Name)</Form.Label>
                  <Select
                    options={employeeNames}
                    value={selectedEmployee}
                    onChange={handleSelectEmployeeChange}
                    placeholder="Select Host (Employee Name)"
                  />
                </Form.Group>
                <Form.Group controlId="visit_type">
                  <Form.Label>Visit Type</Form.Label>
                  <Form.Control as="select" name="visit_type" required>
                    <option value="">Select Visit Type</option>
                    <option value="Contractor">Contractor</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Visitor">Visitor</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="purpose">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control as="select" name="purpose" required>
                    <option value="">Select Purpose</option>
                    <option value="Personal">Personal</option>
                    <option value="Official">Official</option>
                  </Form.Control>
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
