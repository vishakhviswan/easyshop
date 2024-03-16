import React, { useContext } from "react";
import "./ProductDetails.css";
import { Col, Row, Table } from "react-bootstrap";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router";

export const ProductDetails = () => {
  const { allProducts } = useContext(ShopContext);
  const navigate = useNavigate()

  return (
    <div>
      <Row>
        <Col>
          <div className="productdelails-btn-div">
            {/* text  */}
            <h1>All Product</h1>
            {/* Add Product Button  */}
            <button onClick={()=> navigate('/addproduct')}>Add Product</button>
          </div>
        </Col>
      </Row>
      <div className="productdetails-table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product</th>
              <th>Manufacturer</th>
              <th>Category</th>
              <th>Qty</th>
              <th>UOM</th>
              <th>Price</th>
              <th>MRP</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((item, i) => {
              const {
                productName,
                manufacture,
                image,
                productCategory,
                quantity,
                uom,
                productPrice,
                productMrp,
              } = item;
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <img src={image} alt="" style={{ height: "50px" }} />{" "}
                  </td>
                  <td>{productName}</td>
                  <td>{manufacture}</td>
                  <td>{productCategory}</td>
                  <td>{quantity}</td>
                  <td>{uom}</td>
                  <td>{productPrice} </td>
                  <td>{productMrp}</td>
                  <td>
                    <button
                      onClick={() => navigate("/updateproduct")}
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
                      Delete
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
};
