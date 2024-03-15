import React from 'react'
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import './AdminDashboard.css'
import { CiBoxes } from "react-icons/ci";
import { CiBoxList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { ProductDetails } from './ProductDetails';

export const AdminDashboard = () => {

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
                <div className="admin-dash-box">
                  <div className="admin-dash-icon">
                    <CiBoxes />
                  </div>
                  <h2>10</h2>
                  <p>Total Products</p>
                </div>
              </Col>
              {/* Total Orders  */}
              <Col>
                <div className="admin-dash-box">
                  <div className="admin-dash-icon">
                    <CiBoxList />
                  </div>
                  <h2>10</h2>
                  <p>Total Order</p>
                </div>
              </Col>
              {/* Total User  */}
              <Col>
                <div className="admin-dash-box">
                  <div className="admin-dash-icon">
                    <CiUser />
                  </div>
                  <h2>10</h2>
                  <p>Total Order</p>
                </div>
              </Col>
            </Row>
                </Container>
                <ProductDetails/>
        </ThemeProvider>
      </div>
    );
}
