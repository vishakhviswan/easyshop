import React, { Fragment, useContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./AddProducts.css";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase/config";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { AdminOffCanvas } from "./AdminOffCanvas";
import { ShopContext } from "../../Context/ShopContext";
import { v4 as uuidv4 } from "uuid";

export const AddProducts = () => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const db = getFirestore();
  const navigate = useNavigate();
  const auth = getAuth();
  const [confirmModal, setConfirmModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { showCategoryModel, setShowCategoryModel } = useContext(ShopContext);
  const [alert, setalert] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [productManufacture, setProductManufacture] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const productId = uuidv4();

  // const [product, setProduct] = useState({
  //   productName: "",
  //   productMrp: "",
  //   productPrice: "",
  //   productCategory: "",
  //   productDescription: "",
  //   image: imageUrl,
  //   manufacture: "",
  //   id: "",
  // });

  const handleSubmitCategory = () => {
    const AddCategoryRef = collection(db, "Categories");
    setDoc(doc(AddCategoryRef), {
      category: categoryName,
    }) 
      .then(() => {
        setalert(false);
        setShowCategoryModel(false);
      })
      .then(() => {
        setTimeout(() => {
          setalert(true);
        }, 3000);
      });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryData = await getDocs(collection(db, "Categories"));
      setAllCategories(
        categoryData.docs.map((doc) => ({
          ...doc.data(),
        }))
      );
      console.log("products", categoryData);
    };
    getCategories();
  }, [db]);

  const handleSubmit = async () => {
    const imageRef = await ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image);
    getDownloadURL(imageRef).then((url) => {
      // console.log("data url" + url);
      // alert("image Uploaded" + url);

      const AddProductRef = collection(db, "allProduct");
      setDoc(doc(AddProductRef), {
        productName: productName,
        productMrp: productMrp,
        productPrice: productPrice,
        productCategory: productCategory,
        description: description,
        image: url,
        manufacture: productManufacture,
        id: productId,
        quantity:quantity,
      })
        .then(() => {
          addDoc(collection(db, "Stock Items"), {
            productName: productName,
            productMrp: productMrp,
            productPrice: productPrice,
            productCategory: productCategory,
            image: url,
            manufacture: productManufacture,
            id: productId,
            quantity: quantity,
          });
        })
        .then(() => {
          setalert(false);
          // alert("submitted sucsessfull");
          navigate("/");
        });
    });
  };

  // const handleSubmit = async () => {
  //   const imageRef = await ref(storage, `images/${image.name}`);
  //   uploadBytes(imageRef, image);
  //   getDownloadURL(imageRef).then((url) => {
  //     setImageUrl(url);
  //     // console.log("data url" + url);
  //     // alert("image Uploaded" + url);

  //     const AddProductRef = collection(db, "allProduct");
  //     setDoc(doc(AddProductRef), product)
  //       .then(async() => {await
  //         addDoc(collection(db, "Stock Items"), product);
  //       })
  //       .then(() => {

  //         setalert(false);
  //         // alert("submitted sucsessfull");
  //         navigate("/");
  //       });
  //   });
  // };

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/admin")
      return () => {
        setConfirmModal(true);
      };
  }, []);

  return (
    <div>
      <div className="top mb-5 px-5 mt-5">
        <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg">
          <h1 className=" text-center text-2xl font-bold text-pink-500">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="px-5">
        {/* Mid  */}
        <div className="mid mb-5">
          {/* main  */}
          <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
            {/* image  */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt=""
              />
            </div>
            {/* text  */}
            <div className="">
              {/* Name  */}
              <h1 className=" text-center text-lg text-pink-500">
                <span className=" font-bold">Name : </span>
                vishakh
              </h1>
              {/* Email  */}
              <h1 className=" text-center text-lg text-pink-500">
                <span className=" font-bold">Email : </span>
                example@example.com
              </h1>
              {/* Date  */}
              <h1 className=" text-center text-lg text-pink-500">
                <span className=" font-bold">Date : </span>
                28/05/2024
              </h1>
              {/* Role  */}
              <h1 className=" text-center text-lg text-pink-500">
                <span className=" font-bold">Role : </span>
                owner
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Tabs>
          <TabList className="flex flex-wrap -m-4 text-center justify-center">
            {/* Total Products */}
            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
              <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-basket"
                  >
                    <path d="m5 11 4-7" />
                    <path d="m19 11-4-7" />
                    <path d="M2 11h20" />
                    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                    <path d="m9 11 1 9" />
                    <path d="M4.5 15.5h15" />
                    <path d="m15 11-1 9" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                  10
                </h2>
                <p className=" text-pink-500  font-bold">Total Products</p>
              </div>
            </Tab>
            {/* Total Order  */}
            <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
              <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list-ordered"
                  >
                    <line x1={10} x2={21} y1={6} y2={6} />
                    <line x1={10} x2={21} y1={12} y2={12} />
                    <line x1={10} x2={21} y1={18} y2={18} />
                    <path d="M4 6h1v4" />
                    <path d="M4 10h2" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                  10
                </h2>
                <p className=" text-pink-500  font-bold">Total Order</p>
              </div>
            </Tab>
            {/* Total User  */}
            <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
              <div className=" border bg-pink-50 hover:bg-pink-100 border-pink-100 px-4 py-3 rounded-xl">
                <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={50}
                    height={50}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h2 className="title-font font-medium text-3xl text-pink-400 fonts1">
                  10
                </h2>
                <p className=" text-pink-500  font-bold">Total Order</p>
              </div>
            </Tab>
          </TabList>
          {/* <TabPanel>
                            <ProductDetail />
                        </TabPanel>
                        <TabPanel>
                            <OrderDetail/>
                        </TabPanel>
                        <TabPanel>
                           <UserDetail/>
                        </TabPanel> */}
        </Tabs>
      </div>

      <Alert key="success" variant="success" hidden={alert}>
        {categoryName}" " Added Category Successfull
      </Alert>
      {confirmModal ? (
        <div
          className="modal show fade"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>WARNING</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                This is Admin Panel.
                <br /> Press Continue for Admin Login
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go back to home
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  signOut(auth);
                  setConfirmModal(false);
                }}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      ) : (
        <div>
          <AdminOffCanvas />
          <Fragment>
            {showCategoryModel ? (
              <div
                className="modal show fade"
                style={{ display: "block", position: "initial" }}
              >
                <Modal.Dialog>
                  <Modal.Header closeButton>
                    <Modal.Title>CREATE CATEGORY</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label htmlFor="TextInput">Category</Form.Label>
                        <Form.Control
                          id="TextInput"
                          placeholder="Enter Category Name"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        navigate("/admin");
                      }}
                    >
                      Go back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleSubmitCategory();
                      }}
                    >
                      Continue
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </div>
            ) : (
              <card>
                <div className="centerDiv">
                  <label htmlFor="fname">Product Name</label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    value={productName}
                    onChange={(e) =>
                      setProductName(e.target.value.toUpperCase())
                    }
                    id="fname"
                    name="Name"
                    defaultValue="John"
                  />
                  <br />

                  <label htmlFor="fname">Manufacture Name</label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    value={productManufacture}
                    onChange={(e) =>
                      setProductManufacture(e.target.value.toUpperCase())
                    }
                    id="fname"
                    name="Name"
                    defaultValue="John"
                  />
                  <br />
                  <label htmlFor="fname">Product Category</label>
                  <br />
                  <Form.Select
                    value={productCategory}
                    onChange={(e) => {
                      setProductCategory(e.target.value.toUpperCase());
                    }}
                    aria-label="Default select example"
                    className="input-drop"
                  >
                    <option>Open this select menu</option>
                    {allCategories.map((item, i) => {
                      return (
                        <option value={item.category} key={item.category}>
                          {item.category}
                        </option>
                      );
                    })}

                    <hr />
                  </Form.Select>

                  <br />
                  <label htmlFor="fname">Product Price</label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    id="fname"
                    name="Price"
                  />
                  <br />
                  <label htmlFor="fname">Product MRP</label>
                  <br />
                  <input
                    className="input"
                    type="number"
                    value={productMrp}
                    onChange={(e) => setProductMrp(e.target.value)}
                    id="fname"
                    name="Price"
                  />

                  <br />
                  <label htmlFor="fname">Description</label>
                  <br />
                  <input
                    className="input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="fname"
                    name="Price"
                  />

                  <br />
                  <input
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    type="file"
                  />
                  <br />
                  <img
                    alt="Posts"
                    width="200px"
                    height="300px"
                    src={image ? URL.createObjectURL(image) : ""}
                  ></img>
                  <br />
                  <button onClick={handleSubmit} className="uploadBtn">
                    upload and Submit
                  </button>
                </div>
              </card>
            )}
          </Fragment>
        </div>
      )}
    </div>
    // <div>
    //   <Alert key="success" variant="success" hidden={alert}>
    //     {categoryName}" " Added Category Successfull
    //   </Alert>
    //   {confirmModal ? (
    //     <div
    //       className="modal show fade"
    //       style={{ display: "block", position: "initial" }}
    //     >
    //       <Modal.Dialog>
    //         <Modal.Header closeButton>
    //           <Modal.Title>WARNING</Modal.Title>
    //         </Modal.Header>

    //         <Modal.Body>
    //           <p>
    //             This is Admin Panel.
    //             <br /> Press Continue for Admin Login
    //           </p>
    //         </Modal.Body>

    //         <Modal.Footer>
    //           <Button
    //             variant="secondary"
    //             onClick={() => {
    //               navigate("/");
    //             }}
    //           >
    //             Go back to home
    //           </Button>
    //           <Button
    //             variant="primary"
    //             onClick={() => {
    //               signOut(auth);
    //               setConfirmModal(false);
    //             }}
    //           >
    //             Continue
    //           </Button>
    //         </Modal.Footer>
    //       </Modal.Dialog>
    //     </div>
    //   ) : (
    //     <div>
    //       <AdminOffCanvas />
    //       <Fragment>
    //         {showCategoryModel ? (
    //           <div
    //             className="modal show fade"
    //             style={{ display: "block", position: "initial" }}
    //           >
    //             <Modal.Dialog>
    //               <Modal.Header closeButton>
    //                 <Modal.Title>CREATE CATEGORY</Modal.Title>
    //               </Modal.Header>

    //               <Modal.Body>
    //                 <Form>
    //                   <Form.Group className="mb-3">
    //                     <Form.Label htmlFor="TextInput">Category</Form.Label>
    //                     <Form.Control
    //                       id="TextInput"
    //                       placeholder="Enter Category Name"
    //                       value={categoryName}
    //                       onChange={(e) => setCategoryName(e.target.value)}
    //                     />
    //                   </Form.Group>
    //                 </Form>
    //               </Modal.Body>

    //               <Modal.Footer>
    //                 <Button
    //                   variant="secondary"
    //                   onClick={() => {
    //                     navigate("/admin");
    //                   }}
    //                 >
    //                   Go back
    //                 </Button>
    //                 <Button
    //                   variant="primary"
    //                   onClick={() => {
    //                     handleSubmitCategory();
    //                   }}
    //                 >
    //                   Continue
    //                 </Button>
    //               </Modal.Footer>
    //             </Modal.Dialog>
    //           </div>
    //         ) : (
    //           <card>
    //             <div className="centerDiv">
    //               <label htmlFor="fname">Product Name</label>
    //               <br />
    //               <input
    //                 className="input"
    //                 type="text"
    //                 value={product.productName}
    //                 onChange={(e) =>
    //                   setProduct({
    //                     ...product,
    //                     productName: e.target.value.toUpperCase(),
    //                   })
    //                 }
    //                 id="fname"
    //                 name="Name"
    //                 defaultValue="John"
    //               />
    //               <br />

    //               <label htmlFor="fname">Manufacture Name</label>
    //               <br />
    //               <input
    //                 className="input"
    //                 type="text"
    //                 value={product.productManufacture}
    //                 onChange={(e) =>
    //                   setProduct({
    //                     ...product,
    //                     productManufacture: e.target.value.toUpperCase(),
    //                   })
    //                 }
    //                 id="fname"
    //                 name="Name"
    //                 defaultValue="John"
    //               />
    //               <br />
    //               <label htmlFor="fname">Product Category</label>
    //               <br />
    //               <Form.Select
    //                 value={product.productCategory}
    //                 onChange={(e) => {
    //                   setProduct({
    //                     ...product,
    //                     productCategory: e.target.value.toUpperCase(),
    //                   });
    //                 }}
    //                 aria-label="Default select example"
    //                 className="input-drop"
    //               >
    //                 <option>Open this select menu</option>
    //                 {allCategories.map((item, i) => {
    //                   return (
    //                     <option value={item.category} key={item.category}>
    //                       {item.category}
    //                     </option>
    //                   );
    //                 })}

    //                 <hr />
    //               </Form.Select>

    //               <br />
    //               <label htmlFor="fname">Product Price</label>
    //               <br />
    //               <input
    //                 className="input"
    //                 type="number"
    //                 value={product.productPrice}
    //                 onChange={(e) =>
    //                   setProduct({ ...product, productPrice: e.target.value })
    //                 }
    //                 id="fname"
    //                 name="Price"
    //               />
    //               <br />
    //               <label htmlFor="fname">Product MRP</label>
    //               <br />
    //               <input
    //                 className="input"
    //                 type="number"
    //                 value={product.productMrp}
    //                 onChange={(e) =>
    //                   setProduct({ ...product, productMrp: e.target.value })
    //                 }
    //                 id="fname"
    //                 name="Price"
    //               />

    //               <br />
    //               <label htmlFor="fname">Description</label>
    //               <br />
    //               <input
    //                 className="input"
    //                 type="text"
    //                 value={product.productDescription}
    //                 onChange={(e) =>
    //                   setProduct({
    //                     ...product,
    //                     productDescription: e.target.value,
    //                   })
    //                 }
    //                 id="fname"
    //                 name="Price"
    //               />

    //               <br />
    //               <input
    //                 onChange={(e) => {
    //                   setImage(e.target.files[0]);
    //                 }}
    //                 type="file"
    //               />
    //               <br />
    //               <img
    //                 alt="Posts"
    //                 width="200px"
    //                 height="300px"
    //                 src={image ? URL.createObjectURL(image) : ""}
    //               ></img>
    //               <br />
    //               <button onClick={handleSubmit} className="uploadBtn">
    //                 upload and Submit
    //               </button>
    //             </div>
    //           </card>
    //         )}
    //       </Fragment>
    //     </div>
    //   )}
    // </div>
  );
};
