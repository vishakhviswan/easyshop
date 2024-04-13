import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export const Item = (props) => {
  return (
    <div className="item">
      {/* <Link to={`/products/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>

      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price">{props.price}</div>
        <div className="item-mrp">${props.mrp}</div>
      </div> */}

      <Card
        className={props.isSmall ? "smallCard" : "largeCard"}
        // style={
        //   props.isSmall
        //     ? { width: "12rem", height: "18rem" }
        //     : { width: "15rem", height: "18rem" }
        // }
      >
        <Link to={`/products/${props.id}`}>
          <Card.Img
            onClick={()=>{ window.scrollTo(0, 0) }}
            className={props.isSmall ? "smallImg" : "largeImg"}
            variant="top"
            src={props.image}
            // style={props.isSmall ? { width: "12rem" } : { width: "15rem" }}
          />
        </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "15px" }}>{props.name}</Card.Title>
          <Card.Text className="item-prices">
            <div className="item-price">PRICE ₹{props.price}</div>
            <div className="item-mrp">MRP ₹{props.mrp}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
