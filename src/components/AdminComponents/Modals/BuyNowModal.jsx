import React, { useState } from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function BuyNowModal() {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button
        type="button"
        onClick={handleOpen}
        style={{
          width: "262px",
          height: "58px",
          outline: "none",
          border: "none",
          background: "#ff5a5a",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Buy now
      </Button>
      <div
        style={{
          background: "rgba(125,125,125,0.75) ",
          width: "100%",
          position: "absolute",
          height: "150vh",
          display: "flex",
          alignItems: "center",
          alignItems: "top",
          justifyContent: "center",
          top: "0",
          marginLeft: "-85px",
          marginTop: "80px",
        }}
        hidden={open}
      >
        <Modal.Dialog hidden={open}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} sm={12}>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group as={Col} sm={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Mobile</Form.Label>
                <Form.Control placeholder="Mobile Number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>Kollam</option>
                    <option>Thiruvananthapuram</option>
                    <option>Alapuzha</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleOpen}>
              Close
            </Button>
            <Button variant="primary">Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default BuyNowModal;
