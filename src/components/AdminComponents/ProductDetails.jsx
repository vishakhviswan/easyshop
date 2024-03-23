import React, { useContext } from "react";
import "./ProductDetails.css";
import { Col, Row, Table } from "react-bootstrap";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import toast from "react-hot-toast";

export const ProductDetails = () => {
  const {
    allProducts,
    setLoading,
    getProducts,
    getSingleProductFunction,
  } = useContext(ShopContext);
  const navigate = useNavigate()
  const db = getFirestore();
  
  
  

      const deleteProduct = async (id) => {
        setLoading(true);
        try {
          await deleteDoc(doc(db, "allProduct", id));
          toast.success("Product Deleted successfully");
          getProducts();
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

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
                actualQty,
                unit,
                productPrice,
                productMrp,
                id,
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
                  <td>{actualQty}</td>
                  <td>{unit}</td>
                  <td>{productPrice} </td>
                  <td>{productMrp}</td>
                  <td>
                    <button
                      onClick={() => {navigate(`/updateproduct/${id}`)
                         getSingleProductFunction(id)
                      }}
                      
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
                      onClick={() => deleteProduct(id)}
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
