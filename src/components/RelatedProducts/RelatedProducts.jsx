import React from 'react'
import './RelatedProducts.css'
import all_product from '../Assets/all_product'
import {Item} from '../Item/Item'

export const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {all_product.map((item, i) => {
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
        })}
      </div>
    </div>
  )
}
