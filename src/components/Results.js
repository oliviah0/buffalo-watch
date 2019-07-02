/* eslint-disable react/prop-types */
import React from "react";
import { ListGroup } from "react-bootstrap";

const Results = (props) => (
  <div className="my-5">
    <h3 className="my-3 mx-auto">{props.title}</h3>
    <ListGroup className="mb-5" variant="flush">
      {props.rows}
    </ListGroup>
  </div>
);

export default Results;