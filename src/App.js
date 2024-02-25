import React from "react";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom"
import Home from './pages/Home';
import Products from "./pages/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCategory from "./pages/ProductCategory";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/keralamops" element={<ProductCategory category="keralamops" />}/>
          <Route path="/stoff" element={<ProductCategory category="stoff" />} />
          <Route path=":productId" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
