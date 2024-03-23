import React, { useContext } from "react";
import { Item } from "../components/Item/Item";
import "./CSS/ProductCategory.css";
import { ShopContext } from "../Context/ShopContext";
import { RxDropdownMenu } from "react-icons/rx";


function ProductBrand(props) {

const {allProducts} = useContext(ShopContext)



  return (
    <div className="shop-category">
      <img className="shopCategory-banner" src={props.banner} alt="" />
      <div className="shopCategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {allProducts.length} products
        </p>
        <div className="shopCategory-sort">
          Sort by <RxDropdownMenu className="shopCategory-sort-icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allProducts.map((item, i) => {
          if (props.manufacture === item.manufacture) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.productName}
                image={item.image}
                price={item.productPrice}
                mrp={item.productMrp}
                category={item.productCategory}
                isSmall
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

export default ProductBrand;
