/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Tab, Tabs } from 'react-bootstrap';
import Graph from './Graph';
import StockAPI from "../Api";
import moment from "moment";
import StockContext from "../StockContext";
import Spinner from "./Spinner";
import { intraday, week, month } from "../testData";

class Chart extends Component {
  static contextType = StockContext;

  constructor(props) {
    super(props);
    this.state = {
      intraday,
      week,
      month
    };
  }

  async componentDidMount() {
    let { stock } = this.props;
    if (!this.state.intraday) {
      console.log("MAKING API CALL");
      let intraday = await StockAPI.getIntradayData(stock);
      let week = await StockAPI.getWeekData(stock);
      let month = await StockAPI.getMonthData(stock);
      this.setState({ intraday, month, week });
    }
  }

  render() {

    // if (!this.state.intraday) return <div>Loading</div>;
    if (!this.state.month) return  <Spinner />;

    let { intraday, month, week } = this.state;

    const intradayArr = Object.keys(intraday).map(val => {
      let date = new Date(val);
      return {
        x: date.getTime(),
        y: parseFloat(intraday[val].close)
      };
    });

    const weekArr = Object.keys(week).map(val => {
      let date = new Date(val.replace(/-/g, '\/'));
      return { x: date, y: parseFloat(month[val].close)};
    });

    const monthArr = Object.keys(month).map(val => {
      let date = new Date(val.replace(/-/g, '\/'));
      return { x: date, y: parseFloat(month[val].close)};
    });


    return (
      <div className="my-2">
        <Tabs defaultActiveKey="one-day" id="uncontrolled-tab-example">
          <Tab eventKey="one-day" title="1 Day">
            <Graph data={intradayArr} interval={true} />
          </Tab>
          <Tab eventKey="one-week" title="1 Week">
            <Graph data={weekArr} />
          </Tab>
          <Tab eventKey="one-month" title="1 Month">
            <Graph data={monthArr} />
          </Tab>
        </Tabs>

      </div>


    );
  }
}

export default Chart;