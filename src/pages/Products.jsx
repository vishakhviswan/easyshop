import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router";
import { Breadcrum } from "../components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../components/DiscriptionBox/DescriptionBox";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts";
import { useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export const Products = () => {
  const db = getFirestore();
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState("");
  const { productId } = useParams();
  
  const getProductData = async () => {
    try {
      const productTemp = await getDoc(doc(db, "allProduct", productId));
      setProduct(productTemp.data(),productId);
    } catch (error) {
      console.log(error);
    }
  };
  getProductData();


  // const { productId } = useParams();

  return (
    <div>
      {/* <Breadcrum product={product} /> */}
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};
