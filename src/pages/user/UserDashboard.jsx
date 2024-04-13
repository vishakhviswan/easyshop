import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AuthContext } from "../../Context/FirebaseContext";
import "../CSS/UserDashboard.css";
import { ShopContext } from "../../Context/ShopContext";

export const UserDashboard = () => {
  const { user} = useContext(AuthContext);
  const { getAllOrder } = useContext(ShopContext);


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="user-dash-title">
              <h1>{"User Dashboard, Welcome" + " " + user?.displayName}</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="user-details">
              <div className="user-avathar">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt=""
                />
              </div>

              <div className="user-details-text">
                <h3>
                  <span>Name :</span> {user?.displayName}
                </h3>
                <h3>
                  <span>Email :</span> {user?.email}
                </h3>
              </div>
            </div>
          </Col>
        </Row>

        <h3>Order Details</h3>
        {getAllOrder
          .filter((obj) => obj.userid === user?.uid)
          .map((order, index) => {
            return (
              <div className="user-order-details-div">
                {order.cartItemsList.map((item, i) => {
                  const {
                    userid,
                    date,
                    quantity,
                    productPrice,
                    productName,
                    productCategory,
                    image,
                    id,
                  } = item;
                  const { status } = order;
                  return (
                    <Row>
                      <Col md={4}>
                        <div className="user-orderdetails-left">
                          <ul>
                            <li style={{ lineHeight: "15px" }}>
                              <h3>Order Id</h3>
                              <p>#{id}</p>
                            </li>
                            <li>
                              <h3>Date</h3>
                              <p>{date}</p>
                            </li>
                            <li>
                              <h3>Total Amount</h3>
                              <p>Rs {productPrice  * quantity}</p>
                            </li>
                            <li>
                              <h3>Order Status</h3>
                              <p
                                style={{
                                  color: "green",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                }}
                              >
                                { status}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col md={8}>
                        <div className="user-orderdetails-right">
                          <Row>
                            <Col md={3} xs={12}>
                              <div className="user-productImg">
                              <img src={image} alt="" style={{width:"90%"}}/>
                              </div>
                            </Col>
                            <Col md={6} xs={6} className="p-3">
                              <div className="ml-5 flex flex-col justify-between">
                                <div className="flex-1">
                                  <p className="text-sm font-bold text-gray-900">
                                    {productName}
                                  </p>
                                  <p className="mt-1.5 text-sm font-medium text-gray-500">
                                    {productCategory}
                                  </p>
                                </div>
                                <p className="mt-4 text-sm font-medium text-gray-500">
                                  x {quantity}
                                </p>
                              </div>
                            </Col>
                            <Col md={3} xs={3} className="p-3">
                              <div className="ml-auto flex flex-col items-end justify-between">
                                <p className="text-right text-sm font-bold text-gray-900">
                                  ₹ { productPrice}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            );
          })}
      </Container>
    </div>
  );
};
