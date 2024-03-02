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
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

function LoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { setLogIn, logIn, setLogedIn } = useContext(ShopContext);
  const auth = getAuth();
  const db = getFirestore();
  const [id] = useState();
  
  // // =====================trial===============
  // async function handleSignup(e) {
  //   e.preventDefault();
  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then(async (result) => {
  //       const userRef = collection(db, "users");
  //       setDoc(doc(userRef, result.user.uid), {
  //         id: result.user.uid,
  //         name: userName,
  //         email: email
  //       });
  //       // await setDoc(doc(db, "user", "abc"), {
  //       //   name: userName,
  //       //   email: email,
  //       // });
  //       // alert("Signin Succsess" + user);
  //     }).then((result) => {
  //       updateProfile(auth.currentUser, { displayName: userName });
  //       navigate("/login");
  //       setLogIn(true);
  //       alert("add Data Succsess" + result);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       alert(errorCode, "Message:", errorMessage);
  //       console.log(errorMessage, errorCode);
  //       alert(error);
  //       console.log(error);
  //     });
  // }
   const handleSignup = (e) => {
     e.preventDefault();
       createUserWithEmailAndPassword(auth, email, password)
         .then((result) => {
           const usersRef = collection(db, "users");
           setDoc(doc(usersRef, result.user.uid), {
             id: result.user.uid,
             username: userName,
             email: email,
           });
         })
         .then((result) => {
           updateProfile(auth.currentUser, { displayName: userName });
           console.log("result", id);
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           alert(errorCode, "Message:", errorMessage);
           console.log(errorMessage, errorCode);
         })
         .then(() => {
           navigate("/login");
         });
     
   };

  const HandleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/");
        console.log("user"+user)
      })
      .catch((error) => {
        alert(error);
        console.log(error);
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
