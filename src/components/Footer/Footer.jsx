import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/PNG image.png'

import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>EAZYSHOP</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <FaInstagram />
        </div>
        <div className="footer-icons-container">
          <FaFacebookF />
        </div>
        <div className="footer-icons-container">
          <FaLinkedinIn />
        </div>
        <div className="footer-icons-container">
          <FaWhatsapp/>
        </div>
          </div>
          <div className="footer-copyright">
              <hr />
              <p>Copyright @ 2024 * All Rights Reserved.</p>
          </div>
    </div>
  );
}
