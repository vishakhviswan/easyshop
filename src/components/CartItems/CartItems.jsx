import React, { useContext, useEffect } from "react";
import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
import toast from "react-hot-toast";
import { LuMinus } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { TbShoppingCartX } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import BuyNowModal from "../AdminComponents/Modals/BuyNowModal";
import { AuthContext } from "../../Context/FirebaseContext";
import { Navigate } from "react-router";

export const CartItems = () => {
  // const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
const {user} = useContext(AuthContext)
  const cartItemsList = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart")
  };
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
const cartItemTotal = cartItemsList
  .map((item) => item.quantity)
  .reduce((prevValue, currValue) => prevValue + currValue, 0);
const cartTotal = cartItemsList
  .map((item) => item.productPrice * item.quantity)
  .reduce((prevValue, currValue) => prevValue + currValue, 0);

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItemsList));
}, [cartItemsList]);
  
  return (
    <div className="cartitems" >
      <div className="cartitems-format-main" >
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItemsList.map((item, index) => {
        const { id, productName, productPrice, image, category, quantity } =
          item;
        return (
          <div>
            <div className="cartitems-format cartitems-format-main">
              <img src={image} alt="" className="cartitems-product-icon" />
              <p>{productName}</p>
              <p>{productPrice}</p>
              <div>
                <LuMinus onClick={() => handleDecrement(id)} />
                <button className="cartitems-quantity">{quantity}</button>
                <LuPlus onClick={() => handleIncrement(id)} />
              </div>
              <p>{quantity * productPrice}</p>
              <TbShoppingCartX
                className="cartitems-remove-icon"
                onClick={() => deleteCart(item)}
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${cartTotal}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${cartTotal}</h3>
            </div>
            {/* <button>PROCEED TO CKECKOUT</button> */}
            { user ? <BuyNowModal /> : <Navigate to={"/login"} />}
          </div>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code. Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Promo Code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <div className="madalDiv"></div>
    </div>
  );
};
