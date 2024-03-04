import React, { Fragment, useContext, useEffect, useState } from "react";
import "./AddProducts.css";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage"
import {storage} from "../../Firebase/config"

export const AddProducts = () => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [description, setDescription] = useState("");
  const db = getFirestore();
  const navigate = useNavigate();
  const imageListRef = ref(storage,"images/")
const [imageList, setImageList] = useState([])

  const handleSubmit = async() => {
    const imageRef = await ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image)
      getDownloadURL(imageRef).then((url) => {
      console.log("data url" + url); 
      alert("image Uploaded"+ url);

      const AddProductRef = collection(db, "allProduct");
      setDoc(doc(AddProductRef), {
        productName: productName,
        productMrp: productMrp,
        productPrice: productPrice,
        productCategory: productCategory,
        description: description,
        image:url
      })
        .then(() => {
          addDoc(collection(db, "Stock Items"), {
            productName: productName,
            productMrp: productMrp,
            productPrice: productPrice,
            productCategory: productCategory,
            image:url
          });
        })
        .then(() => {
          alert("submitted sucsessfull");
          navigate('/')
        });
    });
  };
  
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log('response'+ response)
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    })
  }, []);


   
  return (
    <div>
      <Fragment>
        <card>
          <div className="centerDiv">
            <label htmlFor="fname">Product Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Product Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
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
            <img
              alt="Posts"
              width="200px"
              height="300px"
              src={image ? URL.createObjectURL(image) : ""}
            ></img>

            <br />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">
              upload and Submit
            </button>
          </div>
        </card>
      </Fragment>
      {/* {imageList.map((url) => {
        return <img src={url}/>
      })} */}
    </div>
  );
};
