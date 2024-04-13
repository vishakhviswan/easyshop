import React, { useState } from "react";
import { Col, Modal, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function BuyNowModal({ addressInfo, setAddressInfo, buyNowFunction}) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);



  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Button
        type="button"
        onClick={() => {
          handleOpen();
          window.scrollTo(0, 0);
        }}
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
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        name: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} sm={12}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        email: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  placeholder="Mobile Number"
                  onChange={(e) => {
                    setAddressInfo({
                      ...addressInfo,
                      mobile: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  onChange={(e) => {
                    setAddressInfo({
                      ...addressInfo,
                      addressLine1: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  onChange={(e) => {
                    setAddressInfo({
                      ...addressInfo,
                      addressLine2: e.target.value,
                    });
                  }}
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        city: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    placeholder="Apartment, studio, or floor"
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        state: e.target.value,
                      });
                    }}
                  >
                    <option>Choose...</option>
                    <option>Kollam</option>
                    <option>Thiruvananthapuram</option>
                    <option>Alapuzha</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    placeholder="Apartment, studio, or floor"
                    onChange={(e) => {
                      setAddressInfo({
                        ...addressInfo,
                        pin: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={()=>handleOpen()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleOpen();
                buyNowFunction();
              }}
            >
              Buy now
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default BuyNowModal;
