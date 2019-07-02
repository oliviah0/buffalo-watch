/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import "./Row.css";

const Row = (props) => {
  const { symbol, price, name, badge } = props;
  return (
    <div>
      <Link to={`/stock/${symbol}`} style={{ textDecoration: 'none' }}>
        <ListGroup.Item className="d-flex justify-content-between" action>
          <span>
            <h6>{symbol}</h6>
            {name && name}
          </span>
          <span>
            {price}
            {badge && badge}
          </span>
        </ListGroup.Item>
      </Link>
    </div>
  );
};

export default Row;

