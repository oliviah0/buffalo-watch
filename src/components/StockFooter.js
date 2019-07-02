/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import "./Stock.css";

class StockFooter extends Component {

  render() {
    const {
      price,
      open,
      high,
      volume,
      low,
      previousClose,
      weekHigh52,
      weekLow52
    } = this.props;
    return (
      <div>
        <Row>
          <Col sm>
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item">
                <span>Open</span>
                <span className="text-muted">{open}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>High</span>
                <span className="text-muted">{high}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>Low</span>
                <span className="text-muted">{low}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm>
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item">
                <span>Close</span>
                <span className="text-muted">{price}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>Previous Close</span>
                <span className="text-muted">{previousClose}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>Close Yester</span>
                <span className="text-muted">{volume}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm>
            <ListGroup variant="flush">
              <ListGroup.Item className="list-group-item">
                <span>52 Week High</span>
                <span className="text-muted">{weekHigh52}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>52 Week Low</span>
                <span className="text-muted">{weekLow52}</span>
              </ListGroup.Item>
              <ListGroup.Item className="list-group-item">
                <span>Volume</span>
                <span className="text-muted">{volume}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StockFooter;