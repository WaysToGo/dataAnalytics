import React, { Component, Fragment } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import Combined from "./Combined";

export default class Charts extends Component {
  render() {
    const { dashboardData, chartData, chart, xaxis, yaxis } = this.props;
    console.log(
      dashboardData,
      chartData,
      chart,
      xaxis,
      yaxis,
      "----------chart---"
    );
    let CreateChart = chart => {
      switch (chart) {
        case "AreaChart":
          return (
            <AreaChart
              dashboardData={dashboardData}
              chartData={chartData}
              xaxis={xaxis}
              yaxis={yaxis}
            />
          );

        case "BarChart":
          return (
            <BarChart
              dashboardData={dashboardData}
              chartData={chartData}
              xaxis={xaxis}
              yaxis={yaxis}
            />
          );

        case "LineChart":
          return (
            <LineChart
              dashboardData={dashboardData}
              chartData={chartData}
              xaxis={xaxis}
              yaxis={yaxis}
            />
          );

        case "Combined":
          return (
            <Combined
              dashboardData={dashboardData}
              chartData={chartData}
              xaxis={xaxis}
              yaxis={yaxis}
            />
          );

        default:
          break;
      }
    };
    return (
      <Fragment>
        {dashboardData && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            {CreateChart(chart)}
            <Combined dashboardData={dashboardData} />
          </div>
        )}
      </Fragment>
    );
  }
}
