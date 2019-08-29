import React, { Component } from "react";
import { Link } from "react-router-dom";
import uuid from "uuid/v4";
import SearchForm from "./SearchForm";
import { Badge } from "react-bootstrap";
import Spinner from "./Spinner";
import Row from "./Row";
import Results from "./Results";
import StockContext from "../StockContext";
import image from "../stock.png";
import "./Home.css";

class Home extends Component {
  static contextType = StockContext;

  makeBadge(percent) {
    return ( 
      <Badge 
        className="mx-2 percent-change-badge" 
        variant={percent > 0 ? "success" : "danger"}>
        {percent}%
      </Badge>
    );
  }

  render() {
    let { watchlistQuotes, watchlist } = this.context;

    if (!watchlistQuotes) return <Spinner />;

    let rows = watchlist.map(stock => (
      <Row
        key={uuid()}
        symbol={stock}
        price={watchlistQuotes[stock].price}
        badge={this.makeBadge(watchlistQuotes[stock].change_pct)}
      />
    ));

    return (
      <div className="my-5">
        <img className="header-image my-3" src={image} alt=""/>
        <SearchForm />
        <Results title="Watchlist" rows={rows} />
      </div>
    );
  }
}

export default Home;


