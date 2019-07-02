import React, { Component } from 'react';
import './App.css';
import 'react-vis/dist/style.css';
import Navigation from "./Navigation";
import Routes from "./Routes";
import StockContext from "../StockContext";
import StockAPI from "../Api";
import { watchlistQuotes } from "../testData.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: ["WDAY", "YELP", "AMZN", "LULU"],
      // watchlistQuotes
    };
  }

  async componentDidMount() {
    if (!this.state.watchlistQuotes && this.state.watchlist) {
      let watchlistQuotes = await StockAPI.getWatchlist(this.state.watchlist);
      this.setState({ watchlistQuotes });
    }
  }

  render() {
    return (
      <StockContext.Provider value={{ ...this.state }}>
        <div className="App">
          <Navigation />
          <Routes />
        </div>
      </StockContext.Provider>
    );
  }
}

export default App;
