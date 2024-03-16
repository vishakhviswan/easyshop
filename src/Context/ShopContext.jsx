import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/Assets/all_product";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";

export const ShopContext = createContext(null);

 




 
 


const ShopContextProvider = (props) => {

  const [allProducts, setAllProducts] = useState([]);
  const [users, setUsers] = useState([])
const db = getFirestore();

useEffect(() => {
  const getProducts = async () => {
    const productsData = await getDocs(collection(db, "allProduct"));
    setAllProducts(
      productsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    console.log("products", productsData);
  };
  getProducts();
}, [db]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await getDocs(collection(db, "users"));
      setUsers(
        usersData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, [db]);


// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < allProducts.length + 1; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };




  //   const [cartItems, setCartItems] = useState(getDefaultCart());
    
    
  //   const addToCart = (itemId) => {
  //       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
  //   }
  //   const removeFromCart = (itemId) => {
  //     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] -1 }));
  //   };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = allProducts.find((product) => product.id === Number(item))
  //       totalAmount += itemInfo.mrp * cartItems[item];
        
  //     }
      
  //   }
  //   return totalAmount;
  // };

 

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems)
  //   {
  //     if (cartItems[item] > 0)
  //     {
  //       totalItem += cartItems[item];
  //       }
  //   }
  //   return totalItem;
  // }

  const [logIn, setLogIn] = useState(false)
  const [logedIn, setLogedIn] = useState(false);
  const [showCategoryModel, setShowCategoryModel] = useState(false);
const [loading, setLoading]=useState(false)

  
  

  
  const contextValue = {
    loading, setLoading,
    users,
    allProducts,
    showCategoryModel,
    setShowCategoryModel,
    logedIn,
    setLogedIn,
    logIn,
    setLogIn,
    all_product,
  };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;