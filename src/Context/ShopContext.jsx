import React, { createContext, useEffect, useState } from "react";
import all_product from "../components/Assets/all_product";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const db = getFirestore();

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
  useEffect(() => {
    getProducts();
  }, []);

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

  // ==============Get Category & Manufactures ===============
  const [categoriesList, setCategoriesList] = useState([]);
  const [manufaturesList, setManufaturesList] = useState([]);
  useEffect(() => {
    getCategoriesAndManufactures();
  }, []);

  const getCategoriesAndManufactures = async () => {
    const categoryData = await getDocs(collection(db, "Categories"));
    const manufactureData = await getDocs(collection(db, "Manufacture"));
    setCategoriesList(
      categoryData.docs.map((doc) => ({
        ...doc.data(),
      }))
    );
    setManufaturesList(
      manufactureData.docs.map((doc) => ({
        ...doc.data(),
      }))
    );
  };

  // ========Update Product ==========
  // product state
  const [product, setProduct] = useState({
    productName: "",
    productMrp: "",
    productPrice: "",
    productCategory: "",
    description: "",
    image: "",
    manufacture: "",
    quantity: "1",
    actualQty: "",
    unit: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function
  const getSingleProductFunction = async (id) => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(db, "allProduct", id));
      //   console.log(product.data())
      const product = productTemp.data();
      setProduct({
        id: id,
        productName: product?.productName,
        productMrp: product?.productMrp,
        productPrice: product?.productPrice,
        productCategory: product?.productCategory,
        description: product?.description,
        image: product?.image,
        manufacture: product?.manufacture,
        quantity: "1",
        actualQty: product?.actualQty,
        unit: product?.unit,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [logIn, setLogIn] = useState(false);
  const [logedIn, setLogedIn] = useState(false);
  const [showCategoryModel, setShowCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categorySelection, setCategorySelection] = useState("");

  const contextValue = {
    getSingleProductFunction,
    product,
    setProduct,
    getProducts,
    categorySelection,
    setCategorySelection,
    getCategoriesAndManufactures,
    categoriesList,
    manufaturesList,
    loading,
    setLoading,
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
  );
};
export default ShopContextProvider;
