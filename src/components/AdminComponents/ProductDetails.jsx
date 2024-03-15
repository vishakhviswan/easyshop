import React from "react";
import "./ProductDetails.css";
import { Col, Row, Table } from "react-bootstrap";

export const ProductDetails = () => {
  return (
    <div>
      <Row>
        <Col>
          <div className="productdelails-btn-div">
            {/* text  */}
            <h1>All Product</h1>
            {/* Add Product Button  */}
            <button>Add Product</button>
          </div>
        </Col>
      </Row>
      <div className="productdetails-table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
