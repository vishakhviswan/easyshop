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
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ShopContext } from "../../Context/ShopContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Firebase/config";
import { useNavigate } from "react-router";

export const UpdateProductPage = () => {
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
    product,
    setProduct,
    getProducts,
  } = useContext(ShopContext);
  const navigate = useNavigate();

  // =======Form States==================
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  // const [productName, setProductName] = useState("");
  // const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  // const [unit, setUnit] = useState("");
  // const [productMrp, setProductMrp] = useState("");
  // const [productPrice, setProductPrice] = useState("");
  // const [description, setDescription] = useState("");

  const handleCreateNew = (e) => {
    if (e.target.value === "Create New Category") {
      setModalTitle("Create Category");
      setModalLabel("Category");
      setModalPlaceholder("Enter Category Name");
      toast.error("Create New Category");
      setHideNewCategory(false);
      setHideForm(true);
      setProduct({ ...product, productCategory: e.target.value });
    } else if (e.target.value === "Create New Manufacture") {
      setModalTitle("Create Manufacture");
      setModalLabel("Manufacture");
      setModalPlaceholder("Enter Manufacture Name");
      toast.error("Create New Manufacture");
      setHideNewCategory(false);
      setHideForm(true);
      setProduct({ ...product, manufacture: e.target.value });
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

 
  const updateProduct = async () => {
    setLoading(true);
    try {
      toast.success("img");
      const imageRef = await ref(storage, `images/${image.name}`);
      uploadBytes(imageRef, image);
      getDownloadURL(imageRef).then(async (url) => {
        setProduct({ ...product, image: url });
        try {
          toast.success("data base");
          await updateDoc(doc(db, "allProduct", product.id), product);
          toast.success("Product Updated successfully");
          getProducts();
          setLoading(false);
          navigate("/admin");
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
              <h3>Update Product</h3>
            </div>
            {/* ===========Product Name=========== */}
            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={product.productName}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    productName: e.target.value,
                  });
                }}
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
                    value={product.actualQty}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        actualQty: e.target.value,
                      });
                    }}
                  />
                </FloatingLabel>
              </Col>
              {/* ===========Unit=========== */}

              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Unit"
                  className="mb-3"
                >
                  <Form.Select
                    style={{ fontSize: "15px" }}
                    size="lg"
                    value={product.unit}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        unit: e.target.value,
                      });
                    }}
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
                    value={product.productMrp}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        productMrp: e.target.value,
                      });
                    }}
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
                    value={product.unit}
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
                    value={product.productPrice}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        productPrice: e.target.value,
                      });
                    }}
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
                    value={product.unit}
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
                value={product.productCategory}
                onChange={(e) => {
                  handleCreateNew(e);
                  setProduct({
                    ...product,
                    productCategory: e.target.value,
                  });
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
                value={product.manufacture}
                onChange={(e) => {
                  handleCreateNew(e);
                  setProduct({
                    ...product,
                    manufacture: e.target.value,
                  });
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
                value={product.description}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    description: e.target.value,
                  });
                }}
              />
            </FloatingLabel>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                // value={product.image}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setProduct({
                    ...product,
                    image: e.target.files[0],
                  });
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
                src={image ? URL.createObjectURL(image) : product.image}
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
              <Button className="uploadBtn" onClick={() => updateProduct()}>
                updateProduct
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
                          setProduct({
                            ...product,
                            productCategory: e.target.value,
                          });
                        } else if (modalTitle === "Create Manufacture") {
                          setNewManufacture(e.target.value);
                          setProduct({
                            ...product,
                            manufacture: e.target.value,
                          });
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
