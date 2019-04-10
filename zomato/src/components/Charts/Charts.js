import React, { Component, Fragment } from "react";

import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: this.props.dashboardData
    };
  }

  handleAddChartClick = () => {};

  render() {
    return (
      <div>
        <BarChart dashboardData={this.state.dashboardData} />
        <LineChart dashboardData={this.state.dashboardData} />
        <AreaChart dashboardData={this.state.dashboardData} />
      </div>
    );
  }
}
