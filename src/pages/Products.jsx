import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router";
import { Breadcrum } from "../components/Breadcrums/Breadcrum";
import { ProductDisplay } from "../components/ProductDisplay/ProductDisplay";
import { DescriptionBox } from "../components/DiscriptionBox/DescriptionBox";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts";

export const Products = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts/>
    </div>
  );
};
