import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner animation="border" variant="success" style={{ zIndex: "99" }} />
    </div>
  );
}

export default Loader;
