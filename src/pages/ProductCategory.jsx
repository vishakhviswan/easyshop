import React, { useContext } from "react";
import { Item } from "../components/Item/Item";
import "./CSS/ProductCategory.css";
import { ShopContext } from "../Context/ShopContext";
import { RxDropdownMenu } from "react-icons/rx";


function ProductCategory(props) {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopCategory-banner" src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopCategory-sort">
          Sort by <RxDropdownMenu className="shopCategory-sort-icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                mrp={item.mrp}
                category={item.category}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopCategory-loadmore">Explore More</div>
    </div>
  );
}

export default ProductCategory;
