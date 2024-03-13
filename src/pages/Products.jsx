import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router";
import { Breadcrum } from "../components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../components/DiscriptionBox/DescriptionBox";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts";
import { useEffect } from "react";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";





export const Products = () => {

  // const { all_product } = useContext(ShopContext);
  const db = getFirestore();
  const [allProducts, setAllProducts] = useState([])
  
  useEffect( () => {
    const q = query(
      collection(db, "allProduct"),
      where("productName", "==", "SKVR SP0014 (150x35)")
    );
    const querySnapshot = getDocs(q);

    setAllProducts(querySnapshot.forEach)
      
  }, [db]);
  
  console.log("hello abc", allProducts);
  // const { productId } = useParams();
  // const product = allProducts.find((e) => e.id === Number(productId));
// console.log("ididid", productId)
  return (
    <div>
      {/* <Breadcrum product={product} /> */}
      <ProductDisplay product={allProducts} />
      <DescriptionBox />
      <RelatedProducts/>
    </div>
  );
}