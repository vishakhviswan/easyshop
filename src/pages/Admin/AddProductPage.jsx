import React, { useContext, useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { Loader } from "../../components/Loader/Loader";
import { ShopContext } from "../../Context/ShopContext";

export const AddProductPage = () => {
  const [hideNewCategory, setHideNewCategory] = useState(true);
  const [hideForm, setHideForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newManufacture, setNewManufacture] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allManufatures, setAllManufatures] = useState([]);
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  const db = getFirestore();
  const [modalTitle, setModalTitle] = useState("");
  const [modalPlaceholder, setModalPlaceholder] = useState("");
  const [modalLabel, setModalLabel] = useState("");
  const { loading, setLoading } = useContext(ShopContext);
  const handleCreateNew = (e) => {
    if (e.target.value === "Create New Category") {
      setModalTitle("Create Category");
      setModalLabel("Category");
      setModalPlaceholder("Enter Category Name");
      toast.error("Create New Category");
      setHideNewCategory(false);
      setHideForm(true);
    } else if (e.target.value === "Create New Manufacture") {
      setModalTitle("Create Manufacture");
      setModalLabel("Manufacture");
      setModalPlaceholder("Enter Manufacture Name");
      toast.error("Create New Manufacture");
      setHideNewCategory(false);
      setHideForm(true);
    } else {
      setCategory(e.target.value);
      setHideNewCategory(true);
    }
  };

  const handleNewCategory = () => {
    const AddCategoryRef = collection(db, "Categories");
    setDoc(doc(AddCategoryRef), {
      category: newCategory,
    })
      .then(() => {
        toast.success(newCategory + " Added to New Category");
        setHideForm(false);
        setHideNewCategory(true);
        getCategories();
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
      manufacture: newManufacture,
    })
      .then(() => {
        toast.success(newManufacture + " Added to New Category");
        setHideForm(false);
        setHideNewCategory(true);
        getManufacture();
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        alert(error.message);
      });
  };

  useEffect(() => {
    getCategories();
    getManufacture();
  }, []);

  const getCategories = async () => {
    const categoryData = await getDocs(collection(db, "Categories"));
    setAllCategories(
      categoryData.docs.map((doc) => ({
        ...doc.data(),
      }))
    );
  };
  const getManufacture = async () => {
    const manufactureData = await getDocs(collection(db, "Manufacture"));
    setAllManufatures(
      manufactureData.docs.map((doc) => ({
        ...doc.data(),
      }))
    );
  };

  return (
    <div>
      {loading && <Loader />}
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
            <FloatingLabel
              controlId="floatingInput"
              label="Product Name"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control type="text" placeholder="Product Name" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Max Retail Price"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control type="text" placeholder="Product Name" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Price"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control type="text" placeholder="Product Name" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Stock Quantity"
              className="mb-3"
            >
              <label htmlFor=""></label>
              <Form.Control type="text" placeholder="Product Name" />
            </FloatingLabel>
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
                }}
              >
                <option>Select One..</option>
                {allCategories.map((item, i) => {
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
                }}
              >
                <option>Select One..</option>
                {allManufatures.map((item, i) => {
                  return <option>{item.category}</option>;
                })}

                <hr />
                <option>Create New Manufacture</option>
              </Form.Select>
            </FloatingLabel>
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
