import React, { Component } from 'react';
import './App.css';
import 'react-vis/dist/style.css';
import ReactTooltip from 'react-tooltip';
import Navigation from "./Navigation";
import Routes from "./Routes";
import StockContext from "../StockContext";
import StockAPI from "../Api";
import { watchlistQuotes } from "../testData.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateWatchlist = (newOrder) => {
      const newState = {
        ...this.state,
        watchlist: newOrder
      };

      this.setState(newState);
    };


    this.state = {
      watchlist: ["WDAY", "YELP", "AMZN", "LULU"],
      // watchlistQuotes, // comment out to it can use real API
      updateWatchlist: this.updateWatchlist
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
      
          <div className="tool-tip-info pulsing" data-tip data-for='info'>
            <span>!</span>
          </div>
          <ReactTooltip
            id='info'
            place='left'
            type='warning'
          >
            <span className="info-text">
              Please note that there is a limit to the amount of requests<br/> 
              per minute that can be made to the World Trading Data API.
            </span>
          </ReactTooltip>
        </div>
      </StockContext.Provider>
    );
  }
}

export default App;
