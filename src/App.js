import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import ProductCategory from "./pages/ProductCategory";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import { Footer } from "./components/Footer/Footer";

import kerala_banner from "./components/Assets/kerala-banner.jpg";
import stoff_banner from "./components/Assets/stoff-banner.webp";
import { Products } from "./pages/Products";
import { Navbar } from "./components/Navbar/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext, FirebaseContext } from "./Context/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import AdminPage from "./pages/AdminPage";

function App() {
  const auth = getAuth();
  const { setUser, setUserDetails } = useContext(AuthContext);

  const { db } = useContext(FirebaseContext);
  
    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
          console.log("userApp", user.uid);
          const userRef = doc(db, "users", user.uid);

          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }
      });
    }, [auth, setUser]);
 

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/keralamops"
            element={
              <ProductCategory banner={kerala_banner} category="keralamops" />
            }
          />
          <Route
            path="/stoff"
            element={<ProductCategory banner={stoff_banner} category="stoff" />}
          />
          <Route path="/products" element={<Products />}>
            <Route path=":productId" element={<Products />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/admin" element={<AdminPage/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
