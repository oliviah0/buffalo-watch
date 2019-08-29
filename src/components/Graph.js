/* eslint-disable react/prop-types */
import React, { Component } from "react";
import moment from "moment";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  Crosshair
} from 'react-vis';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: [],
      width: 1075,
      // width: window.innerWidth * 0.6675,
    };
    this.cleanDateTime = this.cleanDateTime.bind(this);
    this.recalculateWidth = this.recalculateWidth.bind(this);

    window.addEventListener("resize", this.recalculateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.recalculateWidth);
  }

  cleanDateTime(dt) {
    let format = this.props.interval ? "h:mm A" : "dddd, MMMM Do, YYYY";
    return moment(dt).format(format);
  }

  recalculateWidth() {
    let width;
    if (window.innerWidth > 1200) { 
      width = 1075; //1108
    } else if (window.innerWidth > 992) {
      width = 888; //888
    } else if (window.innerWidth > 768) {
      width = 648; //648
    } else {
      width = 468; //468
    }
    // let width = window.innerWidth - 245; // 245 1075
    this.setState({ ...this.state, width });
  }

  render() {
    const { crosshairValues, width } = this.state;
    const xTitle = this.props.interval ? "Time" : "Date";
    let DATA = [this.props.data];

    return (
      <div className="ml-3">

        <XYPlot
          onMouseLeave={() => this.setState({ crosshairValues: [] })}
          xType="time"
          width={width}
          height={500}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickTotal={5} />
          <YAxis
            title="Price"
            tickTotal={5}
            tickFormat={(value) => value} />

          <LineSeries
            onNearestX={(value, { index }) =>
              this.setState({ crosshairValues: DATA.map(d => d[index]) })}
            data={DATA[0]}
            style={{ stroke: 'green', strokeWidth: 3 }} />

          <Crosshair
            values={crosshairValues}
            titleFormat={(d) => ({ title: 'Price', value: d[0].y.toFixed(2) })}
            itemsFormat={(d) => [{ title: xTitle, value: this.cleanDateTime(d[0].x) }]} />
        </XYPlot>
      </div>
    );
  }
}

export default Graph;