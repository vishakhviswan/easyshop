import React from 'react'
import './Popular.css'
import kerala_product from '../Assets/KeralaProducts'
import { Item } from '../Item/Item'

function Populart() {
  return (
      <div className="popular">
          <h1>POPULAR IN KERALA MOPS</h1>
          <hr />
          <div className="popular-item">
              {kerala_product.map((item, i) => {
                  return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} mrp={item.mrp} />
              })}
          </div>
  
          
    </div>
  )
}

export default Populart