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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext, FirebaseContext } from "./Context/FirebaseContext";
import { doc, getDoc } from "firebase/firestore";
import AdminPage from "./pages/AdminPage";
import { ThemeProvider } from "react-bootstrap";
import { Trial } from "./pages/Trial";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";

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
  }, [auth, setUser, db, setUserDetails]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div>
        <Toaster />
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/keralamops"
              element={
                <ProductCategory
                  banner={kerala_banner}
                  manufacture="KERALAMOPS"
                />
              }
            />
            <Route
              path="/stoff"
              element={
                <ProductCategory banner={stoff_banner} manufacture="STOFF" />
              }
            />
            <Route path="/products" element={<Products />}>
              <Route path=":productId" element={<Products />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/trial" element={<Trial />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
