import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import './AdminOffCanvas.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';


export const AdminOffCanvas = () => {
    const [show, setShow] = useState(false);
   const { setShowCategoryModel } = useContext(ShopContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="offCanvas-menu">
                      <li onClick={() => {
                          setShowCategoryModel(true)
                          handleClose()
            }}>
              Create Categories
            </li>
            <li>
              <Link to="/keralamops" style={{ textDecoration: "none" }}>
                Kerala Mops
              </Link>
            </li>
            <li>
              <Link to="stoff" style={{ textDecoration: "none" }}>
                Stoff
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
