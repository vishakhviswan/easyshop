import React, { useContext, useState } from 'react'
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './AdminDashboard.css'
import { CiBoxes } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { ProductDetails } from './ProductDetails';
import toast from 'react-hot-toast';
import OrderDetails from './OrderDetails';
import UserDetails from './UserDetails';
import { ShopContext } from '../../Context/ShopContext';


export const AdminDashboard = () => {
  const [tableSelection, setTableSelection] = useState()
  const { users, allProducts } = useContext(ShopContext);


  var SelectedTable;
    if (tableSelection === "productDetails") {
      SelectedTable = <ProductDetails />;
    } else if (tableSelection === "userDetails") {
      SelectedTable = <UserDetails />;
    } else if (tableSelection === "orderDetails") {
      SelectedTable = <OrderDetails />;
    } else {
      <p>Select Any One</p>
    }
  
  

    return (
      <div>
        <ThemeProvider
          breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          minBreakpoint="xxs"
        >
          {/* Top */}
          <Container>
            <Row>
              <Col>
                <div className="admin-dash-title">
                  <h1>Admin Dashboard</h1>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="admin-details">
                  <div className="admin-avathar">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                      alt=""
                    />
                  </div>

                  <div className="admin-details-text">
                    <h3>
                      <span>Name :</span> Kamal Nayan Upadhyay
                    </h3>
                    <h3>
                      <span>Email :</span> test@gmail.com
                    </h3>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {/* Total Products */}
              <Col xs={12} md={4}>
                <div
                  className="admin-dash-box"
                  onClick={() =>{ setTableSelection("productDetails")
                  }}
                >
                  <div className="admin-dash-icon">
                    <CiBoxes />
                  </div>
                  <h2>{allProducts.length }</h2>
                  <p>Total Products</p>
                </div>
              </Col>
              {/* Total Orders  */}
              <Col>
                <div
                  className="admin-dash-box"
                  onClick={() => setTableSelection("orderDetails")}
                >
                  <div className="admin-dash-icon">
                    <CiBoxList />
                  </div>
                  <h2>10</h2>
                  <p>Total Order</p>
                </div>
              </Col>
              {/* Total User  */}
              <Col>
                <div
                  className="admin-dash-box"
                  onClick={() => setTableSelection("userDetails")}
                >
                  <div className="admin-dash-icon">
                    <CiUser />
                  </div>
                  <h2>{users.length }</h2>
                  <p>Total Users</p>
                </div>
              </Col>
            </Row>
          </Container>
          {SelectedTable}
        </ThemeProvider>
      </div>
    );
}
