import React, { useEffect } from "react";
import "./ProductDisplay.css";
import { FaRegStar } from "react-icons/fa"; //plain
import { FaStar } from "react-icons/fa"; //filled
import { FaStarHalfAlt } from "react-icons/fa"; //half
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Button } from "react-bootstrap";

export const ProductDisplay = (props) => { 
  var { product } = props;
  // const { addToCart} = useContext(ShopContext);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to cart");
    product = null
    // alert("added")
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete Cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img className="productDisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productDisplay-right">
        <h1>{product.productName}</h1>
        <div className="productDisplay-right-star">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FaRegStar />
          <p>(125)</p>
        </div>
        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">
            ${product.productMrp}
          </div>
          <div className="productDisplay-right-price-new">
            ${product.productPrice}
          </div>
        </div>
        <div className="procuctDisplay-right-discription">
          {product.description}
        </div>
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>

          <div className="productDisplay-right-sizes">
            <div>red</div>
            <div>yellow</div>
            <div>white</div>
            <div>purple</div>
          </div>
        </div>
        {cartItems.some((p) => p.id === product.id) ? (
          
          <Button
            onClick={() => {
              deleteCart(product);
            }}
          >
            Delete From Cart
          </Button>
        ) : (
          <button
            onClick={() => {
              addCart(product);
            }}
          >
            ADD TO CART
          </button>
        )}
        <p className="productDisplay-right-category">
          <span>Category: </span>
          Kerala Mops, Mops
        </p>
        <p className="productDisplay-right-tags">
          <span>Tags: </span>
          Latest, super
        </p>
      </div>
    </div>
  );
};
