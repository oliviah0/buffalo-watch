/* eslint-disable react/prop-types */
import React, { Component } from "react";
import uuid from "uuid/v4";
import SearchForm from "./SearchForm";
import StockAPI from "../Api";
import Results from "./Results";
import Row from "./Row";
import image from "../stock.png";
import "./Home.css";
import Spinner from "./Spinner";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.searchStock = this.searchStock.bind(this);
  }

  componentDidMount() {
    this.searchStock();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.searchterm !== this.props.match.params.searchterm) {
      this.searchStock();
    }
  }

  async searchStock() {
    let { searchterm } = this.props.match.params;
    let results = await StockAPI.getSearchList(searchterm);
    this.setState({ searchterm, results });
  }

  render() {
    if (!this.state.results) return <Spinner />;

    let rows = this.state.results.map(stock => (
      <Row
        key={uuid()}
        symbol={stock.symbol}
        name={stock.name}
        price={stock.price}
      />
    ));

    return (

      <div className="my-5"> 
        <img className="header-image my-3" src={image} alt=""/>
        <SearchForm searchterm={this.state.searchterm} />
        <Results title="Search Results" rows={rows} />
      </div>
    );
  }
}

export default Search;


