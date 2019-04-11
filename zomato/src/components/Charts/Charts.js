import React, { Component, Fragment } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";
import Combined from "./Combined";

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: this.props.dashboardData,
      selectedChart: "",
      DynamicDropdown: "",
      values: [],
      charts: {}
    };
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  createChart = () => {
    const { selectedChart, dashboardData, charts } = this.state;
    switch (selectedChart) {
      case "AreaChart":
        if (dashboardData) {
          let keys = Object.keys(dashboardData[0]);
          let chartClone = Object.assign({}, charts);
          chartClone.areaChart = keys;
          this.setState({
            charts: chartClone
          });
        }
        break;

      case "BarChart":
        if (dashboardData) {
          let keys = Object.keys(dashboardData[0]);
          let chartClone = Object.assign({}, charts);
          chartClone.barChart = keys;
          this.setState({
            charts: chartClone
          });
        }
        break;

      case "LineChart":
        if (dashboardData) {
          let keys = Object.keys(dashboardData[0]);
          let chartClone = Object.assign({}, charts);
          chartClone.lineChart = keys;
          this.setState({
            charts: chartClone
          });
        }
        break;

      default:
        break;
    }
  };

  render() {
    const { dashboardData } = this.state;

    return (
      <Fragment>
        {/* <ChartModal {...this} /> */}

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
