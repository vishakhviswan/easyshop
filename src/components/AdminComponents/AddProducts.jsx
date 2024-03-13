import React, { Fragment, useContext, useEffect, useState } from "react";
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
  const db = getFirestore();
  const navigate = useNavigate();
  const auth = getAuth();
  const [confirmModal, setConfirmModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { showCategoryModel, setShowCategoryModel } = useContext(ShopContext);
  const [alert, setalert] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [productManufacture, setProductManufacture] = useState("");
  const productId = uuidv4();

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
          });
        })
        .then(() => {
          setalert(false);
          // alert("submitted sucsessfull");
          navigate("/");
        });
    });
  };
  useEffect(() => {
    if (window.location.href === "http://localhost:3000/admin")
      return () => {
        setConfirmModal(true);
      };
  }, []);

  return (
    <div>
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
  );
};
