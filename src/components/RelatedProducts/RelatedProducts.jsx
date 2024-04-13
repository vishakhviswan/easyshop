import React, { useContext } from 'react'
import './RelatedProducts.css'
import {Item} from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'


export const RelatedProducts = () => {
  const { allProducts } = useContext(ShopContext);

  
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item" >
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
}
