import React, { useContext } from 'react'
import "./ProductDetails.css";
import { Col, Row, Table } from "react-bootstrap";
import { ShopContext } from '../../Context/ShopContext';

function UserDetails() {
    const {users} = useContext(ShopContext)
  return (
    <div>
      <Row>
        <Col>
          <div className="productdelails-btn-div">
            {/* text  */}
            <h1>All Users</h1>
            {/* Add Product Button  */}
            <button>Add Users</button>
          </div>
        </Col>
      </Row>
      <div className="productdetails-table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
                      {users.map((result, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{result.username}</td>
                  <td>{result.email} </td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: "blue",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        background: "none",
                        color: "red",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserDetails