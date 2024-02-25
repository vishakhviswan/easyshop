import React from 'react'
import './Item.css'

export const Item = (props) => {
  return (
      <div className="item">
          <img src={props.image} alt="" />
          <p>{props.name}</p>
          <div className="item-prices">
              
          <div className="item-price">
              {props.price}
              </div>
              <div className="item-mrp">
                  ${props.mrp}
              </div>
          </div>
   </div>
  )
}
