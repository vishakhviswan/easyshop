import React, { useEffect, useRef, useState } from 'react'
import './Popular.css'
// import kerala_product from '../Assets/KeralaProducts'
import { Item } from "../Item/Item";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { collection, getDocs, getFirestore } from "firebase/firestore";
function Populart() {
  
    const [allProducts, setAllProducts] = useState([]);
  const db = getFirestore();
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  

  const handleScroll=() => {
    ref.current.scrollIntoView({behavior:'smooth'})
  };

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
      <div className="popular-item" ref={ref}>
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
        <div className="arrowIcons">
          <div
            className="arrowLeft"
            onClick={() => {
              scroll(-800);
            }}
          >
            <MdOutlineArrowForwardIos className="arrowLeftIcon" />
          </div>
          <div
            className="arrowRight"
            onClick={() => {
              scroll(600);
            }}
          >
            <MdOutlineArrowForwardIos className="arrowRightIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Populart