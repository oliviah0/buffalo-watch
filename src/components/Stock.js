/* eslint-disable react/prop-types */
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import uuid from "uuid/v4";
import Chart from "./Chart";
import StockHeader from "./StockHeader";
import StockFooter from "./StockFooter";
import StockAPI from "../Api";
import StockContext from "../StockContext";
import Spinner from "./Spinner";
import { stockData } from "../testData";
import { Button } from "react-bootstrap";


class Stock extends Component {

  static contextType = StockContext;

  constructor(props) {
    super(props);
    this.state = {
      data: stockData // for testing uncomment
    };
  }

  async componentDidMount() {
    let stock = this.props.match.params.id;
    let data = await StockAPI.getData(stock);
    this.setState({ data });
  }


  render() {
    if (!this.state.data) return (<Spinner />);
    let stock = this.props.match.params.id;

    const {
      symbol,
      price_open,
      day_high,
      day_low,
      price,
      volume,
      last_trade_time,
      close_yesterday,
      day_change,
      change_pct,
      market_cap

    } = this.state.data;

    const following = this.context.watchlist.includes(symbol) ? "Watching" : "Follow";
    const followColor = following === "Watching" ? "success" : "primary";

    return (
      <div className="my-5">
        <Button onClick={() => this.props.history.goBack()} variant="link"><i className="fas fa-angle-double-left"></i> Return back</Button>
        <StockHeader
          symbol={symbol}
          following={following}
          followColor={followColor}
          lastTradingDay={last_trade_time}
          change={day_change}
          changePercent={change_pct}
          price={price} />
        <Chart stock={stock} />
        <StockFooter
          price={price}
          open={price_open}
          high={day_high}
          low={day_low}
          volume={volume}
          previousClose={close_yesterday}
          marketCap={market_cap}
          weekHigh52={this.state.data["52_week_high"]}
          weekLow52={this.state.data["52_week_low"]} />
      </div>
    );
  }

}

export default Stock;