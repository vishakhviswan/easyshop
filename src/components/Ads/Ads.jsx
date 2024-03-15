import React from "react";
import "./Ads.css";
import ads_img from "../Assets/ads-2.png";

import { PiHandWaving } from "react-icons/pi";
import { IconContext } from "react-icons";
import { FaArrowRight } from "react-icons/fa";
import { ThemeProvider } from "react-bootstrap";

function Ads() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
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
              <PiHandWaving/>
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
          <img className="ads-right-img" src={ads_img} alt="ads-img" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Ads;
