import React, { useContext, useState } from "react";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/FirebaseContext";
import { getAuth, signOut } from "firebase/auth";


export const Navbar = () => {
  const [menu, setMenu] = useState("all");
  const { getTotalCartItems, logedIn } = useContext(ShopContext);
  const [count, setCount] = useState(0);
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate()

  // const HandleSignout = () => {
  //   try {
  //      signOut(auth);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

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
          <Link to="/keralamops" style={{ textDecoration: "none" }}>
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
        {user ? (
          <div>
            <h3>{"Welcome " + user.displayName}</h3>
            <button className="signOutBtn" onClick={() => {
              signOut(auth).then(() => {
                navigate("/")
              })
            }}>signout</button>
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
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
