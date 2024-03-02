import React, { useContext } from "react";
import "./ProductDisplay.css";

import { FaRegStar } from "react-icons/fa"; //plain
import { FaStar } from "react-icons/fa"; //filled
import { FaStarHalfAlt } from "react-icons/fa"; //half
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart} = useContext(ShopContext);

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
        <h1>{product.name}</h1>
        <div className="productDisplay-right-star">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FaRegStar />
          <p>(125)</p>
        </div>
        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">${product.price}</div>
          <div className="productDisplay-right-price-new">${product.mrp}</div>
        </div>
        <div className="procuctDisplay-right-discription">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis!
        </div>
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>

          <div className="productDisplay-right-sizes">
            <div>red</div>
            <div>yellow</div>
            <div>white</div>
            <div>purple</div>
            <div>vilot</div>
          </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
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
