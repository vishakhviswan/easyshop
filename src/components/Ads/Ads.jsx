import React from "react";
import "./Ads.css";
import ads_img from "../Assets/ads-2.png";

import { PiHandWaving } from "react-icons/pi";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

function Ads() {
  return (
    <div className="ads">
      <div className="ads-left">
        <h2>Best Quality Products</h2>
        <div className="ads-hand-icon">
          <p>new</p>
          <IconContext.Provider
            value={{
              color: "dark grey",
              className: "ads-hand-iconImg",
              size: "105px",
            }}
          >
            <PiHandWaving />
          </IconContext.Provider>
        </div>
        <p>collections</p>
        <p>for everyone</p>
        <div className="ads-latest-btn">
          <div>Latest Collection</div>
          <FaArrowRight />
        </div>
      </div>
      <div className="ads-right">
        <img src={ads_img} alt="Image" />
      </div>
    </div>
  );
}

export default Ads;
