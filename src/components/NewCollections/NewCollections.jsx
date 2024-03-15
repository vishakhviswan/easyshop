import React, { useContext, useEffect, useState } from "react";
import "./NewCollections.css";
// import new_collection from "../Assets/new_collections";
import { Item } from "../Item/Item";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ShopContext } from "../../Context/ShopContext";

export const NewCollections = () => {
  const {allProducts} = useContext(ShopContext)

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {allProducts.map((item, i) => {
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
        })}
      </div>
    </div>
  );
};
