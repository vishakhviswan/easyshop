import React, { useContext, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/FirebaseContext";
import { getAuth, signOut } from "firebase/auth";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import "./Header.css";

import { ShopContext } from "../../Context/ShopContext";

function Header() {
  const { user } = useContext(AuthContext);
  const { categoriesList, categorySelection, setCategorySelection } =
    useContext(ShopContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const cartItems = useSelector((state) => state.cart);


  



  return (
    <div>
      {/* ============Navbar Bootstrap=============== */}

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Eazy Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "GrayText" }}
                >
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/keralamops"
                  style={{ textDecoration: "none", color: "GrayText" }}
                >
                  Kerala Mops
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/stoff"
                  style={{ textDecoration: "none", color: "GrayText" }}
                >
                  Stoff
                </Link>
              </Nav.Link>
              <NavDropdown
                title={categorySelection ? categorySelection : "Categories"}
                id="navbarScrollingDropdown"
              >
                {categoriesList.map((item, i) => {
                  
                  return (
                    <NavDropdown.Item value={item.category}>
                      <Link
                        value={item.category}
                        to={`/${item.category}`}
                        onClick={(e) => {
                          setCategorySelection(item.category);
                        }}
                        style={{
                          textDecoration: "none",
                          color: "GrayText",
                        }}
                      >
                        {item.category}
                      </Link>
                    </NavDropdown.Item>
                  );
                })}
                <NavDropdown.Divider />
                <NavDropdown.Item>Something else here</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="nav-login-cart">
              {user ? (
                <div>
                  <h3>{"Welcome " + user.displayName}</h3>
                  <button
                    className="signOutBtn"
                    onClick={() => {
                      signOut(auth).then(() => {
                        navigate("/");
                      });
                    }}
                  >
                    signout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button>Login</button>
                </Link>
              )}
              <Link to="/cart">
                <IconContext.Provider
                  value={{
                    color: "dark grey",
                    className: "global-class-name",
                    size: "3em",
                  }}
                >
                  <FaShoppingCart />
                </IconContext.Provider>
              </Link>
              <div className="nav-cart-count">{cartItems.length}</div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
