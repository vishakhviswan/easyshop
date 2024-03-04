import React, { useEffect, useState } from 'react'
import './Popular.css'
// import kerala_product from '../Assets/KeralaProducts'
import { Item } from "../Item/Item";

import { collection, getDocs, getFirestore } from "firebase/firestore";
function Populart() {
  
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
    console.log("hello", allProducts);



  return (
      <div className="popular">
          <h1>POPULAR IN KERALA MOPS</h1>
          <hr />
          <div className="popular-item">
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
                    />
                  );
              })}
          </div>
  
          
    </div>
  )
}

export default Populart