import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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

      <Card style={props.isSmall ? { width: "12rem" } : { width: "15rem" }}>
        <Link to={`/products/${props.id}`}>
          <Card.Img variant="top" src={props.image} />
          </Link>
        <Card.Body>
          <Card.Title style={{ fontSize: "15px" }}>{props.name}</Card.Title>
          <Card.Text className="item-prices" >
            <div className="item-price">PRICE ₹{props.price}</div>
            <div className="item-mrp">MRP ₹{props.mrp}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
