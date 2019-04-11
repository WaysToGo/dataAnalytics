import React, { Component, Fragment } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import Combined from "./Combined";

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: this.props.dashboardData
    };
  }

  render() {
    const { dashboardData } = this.state;

    return (
      <Fragment>
        <div className="mb-5" />
        {dashboardData && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <AreaChart dashboardData={dashboardData} />
            <BarChart dashboardData={dashboardData} />
            <LineChart dashboardData={dashboardData} />
            <Combined dashboardData={dashboardData} />
          </div>
        )}
      </Fragment>
    );
  }
}
