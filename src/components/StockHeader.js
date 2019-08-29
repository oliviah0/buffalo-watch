/* eslint-disable react/prop-types */
import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import uuid from "uuid/v4";
import { Card, Button } from "react-bootstrap";
import moment from "moment";
import "./Stock.css";

class StockHeader extends Component {

  render() {
    let { symbol, lastTradingDay, change, changePercent, price, following, followColor } = this.props;
    let closeDate = moment(lastTradingDay).format('LLL');

    // if symbol is in context, show unfollow
    // when you unfollow, remove from context watchlist and watchlistQuotes;

    return (
      <div className="my-3">
        <Card>
          <Card.Body>
            <Card.Title>{symbol}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{price} USD {change} ({changePercent})</Card.Subtitle>
            <Card.Text>
              Closed: {closeDate}
            </Card.Text>
            <Button 
              className={"follow-btn " + following.toLowerCase()} 
              variant={followColor}>
              <span>{following}</span>
            </Button>
          </Card.Body>

        </Card>

      </div>
    );
  }
}

export default StockHeader;