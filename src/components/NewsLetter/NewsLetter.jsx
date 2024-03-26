import React from "react";
import "./NewsLetter.css";

export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div
        className="                  "
        style={{
          background: "transparent",
          border: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Get Exclusive Offers On Your Email</h1>
      </div>
      <div
        style={{
          background: "transparent",
          border: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Subscribe to our newsletter and stay updated</p>
      </div>

      <div>
        <input type="email" placeholder="Your Email id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
