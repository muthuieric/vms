// import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
// import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateTm } from '../services/TmsService';



const UpdateTmModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTm(props.tm.id, e.target)
          .then((result) => {
            alert(result);
            props.setUpdated(true);
          })
          .catch((error) => {
            console.error('Failed to Update Tm:', error);
            alert('Failed to Update Tm');
          });
      };
      
    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Tm Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="Name" required defaultValue={props.tm.Name} placeholder="" />
                            </Form.Group>

                           
                            <Form.Group controlId="Phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" name="Phone" required defaultValue={props.tm.Phone} placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="Email" required defaultValue={props.tm.Email} placeholder="" />
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
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateTmModal;

