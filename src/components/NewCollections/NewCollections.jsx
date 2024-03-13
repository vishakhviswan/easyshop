import React, { useEffect, useState } from "react";
import "./NewCollections.css";
// import new_collection from "../Assets/new_collections";
import { Item } from "../Item/Item";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const NewCollections = () => {
  const [allProducts, setAllProducts] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await getDocs(collection(db, "allProduct"));
      setAllProducts(
        productsData.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
      console.log("products", productsData);
    };
    getProducts();
  }, [db]);
console.log("hello", allProducts)
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
