import React from 'react'
import './Breadcrum.css'
import { HiOutlineArrowSmRight } from "react-icons/hi";

export const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className='breadcrum'>
      
      HOME <HiOutlineArrowSmRight /> SHOP <HiOutlineArrowSmRight /> {product.category} <HiOutlineArrowSmRight /> {product.name} 
      
      </div>
  )
}
