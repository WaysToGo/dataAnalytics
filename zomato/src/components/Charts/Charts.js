import React, { Component, Fragment } from "react";
import Combined from "./Combined";

export default class Charts extends Component {
  render() {
    const { dashboardData, chartData, xaxis, yaxis } = this.props;

    return (
      <Fragment>
        {dashboardData && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Combined
              dashboardData={dashboardData}
              chartData={chartData}
              xaxis={xaxis}
              yaxis={yaxis}
            />
          </div>
        )}
      </Fragment>
    );
  }
}
