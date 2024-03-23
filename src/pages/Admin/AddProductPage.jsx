import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { ShopContext } from "../../Context/ShopContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase/config";
import { useNavigate } from "react-router";

export const AddProductPage = () => {
  const [hideNewCategory, setHideNewCategory] = useState(true);
  const [hideForm, setHideForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newManufacture, setNewManufacture] = useState("");
  

  const db = getFirestore();
  const [modalTitle, setModalTitle] = useState("");
  const [modalPlaceholder, setModalPlaceholder] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const {
    setLoading,
    getCategoriesAndManufactures,
    categoriesList,
    manufaturesList,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  
  // =======Form States==================
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [unit, setUnit] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateNew = (e) => {
    if (e.target.value === "Create New Category") {
      setModalTitle("Create Category");
      setModalLabel("Category");
      setModalPlaceholder("Enter Category Name");
      toast.error("Create New Category");
      setHideNewCategory(false);
      setHideForm(true);
      setCategory(e.target.value);
    } else if (e.target.value === "Create New Manufacture") {
      setModalTitle("Create Manufacture");
      setModalLabel("Manufacture");
      setModalPlaceholder("Enter Manufacture Name");
      toast.error("Create New Manufacture");
      setHideNewCategory(false);
      setHideForm(true);
      setManufacture(e.target.value);
    } else {
      // setCategory(e.target.value);
      setHideNewCategory(true);
    }
  };

  const handleNewCategory = () => {
    setLoading(true);
    const AddCategoryRef = collection(db, "Categories");
    setDoc(doc(AddCategoryRef), {
      category: newCategory.toUpperCase(),
    })
      .then(() => {
        toast.success(newCategory + " Added to New Category");
        setHideForm(false);
        setHideNewCategory(true);
        getCategoriesAndManufactures();
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        alert(error.message);
      });
  };
  const handleNewManufacture = () => {
    setLoading(true);
    const AddManufactureRef = collection(db, "Manufacture");
    setDoc(doc(AddManufactureRef), {
      manufacture: newManufacture.toUpperCase(),
    })
      .then(() => {
        toast.success(newManufacture + " Added to New Category");
        setHideForm(false);
        setHideNewCategory(true);
        getCategoriesAndManufactures();
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        alert(error.message);
      });
  };


  const handleSubmit = async () => {
    setLoading(true);
    const imageRef = await ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image);
    getDownloadURL(imageRef).then((url) => {
      const AddProductRef = collection(db, "allProduct");
      setDoc(doc(AddProductRef), {
        productName: productName,
        productMrp: productMrp,
        productPrice: productPrice,
        productCategory: category,
        description: description,
        image: url,
        manufacture: manufacture,
        quantity: "1",
        actualQty: quantity,
        unit: unit,
      })
        .then(() => {
          addDoc(collection(db, "Stock Items"), {
            productName: productName,
            productMrp: productMrp,
            productPrice: productPrice,
            productCategory: category,
            description: description,
            image: url,
            manufacture: manufacture,
            quantity: "1",
            actualQty: quantity,
            unit: unit,
          });
        })
        .then(() => {
          toast.success(productName + "Added Successful");
          navigate("/");
          setLoading(false);
        });
    });
  };
  return (
    <div>
      <Container>
        <div
          className="formdiv mt-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Form
            hidden={hideForm}
            style={{
              width: "28em",
              background: "rgb(236, 221, 223)",
              padding: "3em",
              borderRadius: "10px",
            }}
          >
            <div
              className="formTitle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Create Product</h3>
            </div>

            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
              />
            </FloatingLabel>
            {/* ===========Quantity=========== */}
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Stock Quantity"
                  className="mb-3"
                >
                  <label htmlFor=""></label>
                  <Form.Control
                    type="number"
                    placeholder="Stock Quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Unit"
                  className="mb-3"
                >
                  <Form.Select
                    style={{ fontSize: "15px" }}
                    size="lg"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option>Select One..</option>
                    <option>KGS - Kilograms</option>
                    <option>PCS - Pieces</option>
                    <option>DOZ - Dozen</option>
                    <option>Box - Box</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            {/* ===========MRP=========== */}
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Max Retail Price"
                  className="mb-3"
                >
                  <label htmlFor=""></label>
                  <Form.Control
                    type="number"
                    placeholder="Max Retail Price"
                    onChange={(e) => setProductMrp(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Per"
                  className="mb-3"
                >
                  <label htmlFor=""></label>
                  <Form.Control
                    type="text"
                    placeholder="Per"
                    value={unit}
                    disabled
                  />
                </FloatingLabel>
              </Col>
            </Row>
            {/* ===========Price=========== */}
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Price"
                  className="mb-3"
                >
                  <label htmlFor=""></label>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Per"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Per"
                    value={unit}
                    disabled
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <FloatingLabel
              controlId="floatingInput"
              label="Category"
              className="mb-3"
            >
              <Form.Select
                style={{ fontSize: "15px" }}
                size="lg"
                value={category}
                onChange={(e) => {
                  handleCreateNew(e);
                  setCategory(e.target.value);
                }}
              >
                <option>Select One..</option>
                {categoriesList.map((item, i) => {
                  return <option>{item.category}</option>;
                })}

                <hr />
                <option>Create New Category</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Manufacture"
              className="mb-3"
            >
              <Form.Select
                style={{ fontSize: "15px" }}
                size="lg"
                value={manufacture}
                onChange={(e) => {
                  handleCreateNew(e);
                  setManufacture(e.target.value);
                }}
              >
                <option>Select One..</option>
                {manufaturesList.map((item, i) => {
                  return <option>{item.manufacture}</option>;
                })}

                <hr />
                <option>Create New Manufacture</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Description"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
            </Form.Group>

            <div
              className="imageDiv"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                width: "22em",
                height: "300px",
                background: "white",
              }}
            >
              <img
                alt="Posts"
                width="200px"
                height="300px"
                src={image ? URL.createObjectURL(image) : "Upload Image"}
              ></img>
            </div>
            <div
              className="buttonDiv mt-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="uploadBtn" onClick={() => handleSubmit()}>
                upload and Submit
              </Button>
            </div>
          </Form>
          {/* =============================================================== */}
          {/* .                           MODAL */}
          {/* =============================================================== */}

          <div
            hidden={hideNewCategory}
            className="modal show fade"
            style={{ display: "block", position: "initial", width: "28em" }}
          >
            <Modal.Dialog>
              <Modal.Header
                closeButton
                style={{ background: "rgb(236, 221, 223)" }}
              >
                <Modal.Title style={{ fontWeight: "700" }}>
                  {modalTitle}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body style={{ background: "rgb(236, 221, 223)" }}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="TextInput">{modalLabel}</Form.Label>
                    <Form.Control
                      id="TextInput"
                      placeholder={modalPlaceholder}
                      onChange={(e) => {
                        if (modalTitle === "Create Category") {
                          setNewCategory(e.target.value);
                          setCategory(e.target.value);
                        } else if (modalTitle === "Create Manufacture") {
                          setNewManufacture(e.target.value);
                          setManufacture(e.target.value);
                        }
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer style={{ background: "rgb(236, 221, 223)" }}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setHideNewCategory(true);
                    setHideForm(false);
                  }}
                >
                  Go back
                </Button>
                <Button
                  onClick={(e) => {
                    if (modalTitle === "Create Category") {
                      handleNewCategory();
                    } else if (modalTitle === "Create Manufacture") {
                      handleNewManufacture();
                    }
                  }}
                >
                  Continue
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      </Container>
    </div>
  );
};
