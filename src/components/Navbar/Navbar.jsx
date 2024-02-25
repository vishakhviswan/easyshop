import React, { useState } from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [menu, setMenu] = useState("all");
  const [count, setCount] = useState(0);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <p>Easy Shop</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("all");
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            All Products
          </Link>{" "}
          {menu === "all" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("kerala");
          }}
        >
          <Link to="/keralamops" style={{ textDecoration: 'none' }}>
            {" "}
            Kerala Mops{" "}
          </Link>
          {menu === "kerala" ? <hr /> : <></>}{" "}
        </li>
        <li
          onClick={() => {
            setMenu("stoff");
          }}
        >
          <Link to="stoff" style={{ textDecoration: "none" }}>
            Stoff
          </Link>
          {menu === "stoff" ? <hr /> : <></>}{" "}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
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
        <div
          onClick={() => {
            setCount(count + 1);
          }}
          className="nav-cart-count"
        >
          {count}{" "}
        </div>
      </div>
    </div>
  );
};
