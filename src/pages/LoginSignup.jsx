import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";
import "../Firebase/config";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader/Loader";

function LoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { setLogIn, logIn, loading, setLoading } = useContext(ShopContext);
  const auth = getAuth();
  const db = getFirestore();
  const [id] = useState();

  const handleSignup = (e) => {
    if (userName === "" || email === "") {
      return toast.error("All fields are required");
    }
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const usersRef = collection(db, "users");
        setDoc(doc(usersRef, result.user.uid), {
          id: result.user.uid,
          username: userName,
          email: email,
          time: Timestamp.now(),
          date: new Date().toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        });
      })
      .then((result) => {
        updateProfile(auth.currentUser, { displayName: userName });
        console.log("result", id);
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorMessage, errorCode);
      })
      .then(() => {
        navigate("/");
        setLogIn(true);
        toast.success("Welcome to Our World");
      });
  };

  const HandleLogin = () => {
    if (userName === "" || email === "") {
      return toast.error("All fields are required");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/");
        console.log("user" + user);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        navigate("/");
        setLoading(false);
      });
  };

  // const HandleSignout = () => {
  //   try {
  //     await signOut(auth);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  return (
    <div className="loginsignup">
      {loading && <Loader />}
      <div className="loginsignup-container">
        <h1>{logIn ? "Login" : "Sign Up"}</h1>
        <div className="loginsignup-field">
          {logIn === false ? (
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            ""
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {logIn ? (
          <button
            onClick={() => {
              HandleLogin();
            }}
          >
            Login
          </button>
        ) : (
          <button
            onClick={(e) => {
              handleSignup(e);
            }}
          >
            Continue
          </button>
        )}
        {logIn ? (
          <p className="loginsignup-login">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setLogIn(false);
              }}
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Allready have an account?{" "}
            <span
              onClick={() => {
                setLogIn(true);
              }}
            >
              Login
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" size="large" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
