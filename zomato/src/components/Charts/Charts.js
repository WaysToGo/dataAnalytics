import React, { Component, Fragment } from "react";
import Combined from "./Combined";
import ChartModal from "../Modal/ChartModal";

export default class Charts extends Component {
  constructor() {
    super();
    this.state = {
      chartData: [{ field: "", color: "#8884d8", chart: "BarChart" }],
      xaxis: "",
      yaxis: "",
      on: false,
      showChart: false
    };
  }

  componentDidMount = () => {
    let initialValue = null;
    try {
      initialValue = Object.keys(this.props.dashboardData[0])[0];
    } catch (error) {
      console.log("didnt receive initial value");
    }
    if (initialValue) {
      this.setState({
        chartData: [
          { field: initialValue, color: "#8884d8", chart: "BarChart" }
        ],
        xaxis: initialValue,
        yaxis: initialValue
      });
    }
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  handleChange = e => {
    if (["field", "color", "chart"].includes(e.target.name)) {
      let chartData = [...this.state.chartData];
      chartData[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ chartData }, () => console.log(this.state.chartData));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addChart = e => {
    let initialValue = null;
    try {
      initialValue = Object.keys(this.props.dashboardData[0])[0];
    } catch (error) {
      console.log("didnt receive initial value");
    }
    if (initialValue) {
      this.setState(prevState => ({
        chartData: [
          ...prevState.chartData,
          { field: initialValue, color: "#8884d8", chart: "BarChart" }
        ]
      }));
    }
  };
  removeChart = e => {
    let copy = this.state.chartData.slice();
    copy.pop();
    this.setState(prevState => ({
      chartData: [...copy]
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      showChart: true
    });
  };
  render() {
    const { dashboardData } = this.props;
    const { chartData, xaxis, yaxis, on, showChart } = this.state;

    return (
      <Fragment>
        <div className="d-flex flex-row-reverse">
          <button
            onClick={() => {
              this.toggle();
            }}
            className="btn dashboard-modal "
          >
            <i className="far fa-plus-square" />
            Chart
          </button>
          <ChartModal
            dashboardData={dashboardData}
            on={on}
            toggle={this.toggle}
            addChart={this.addChart}
            removeChart={this.removeChart}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            chartData={chartData}
            xaxis={xaxis}
            yaxis={yaxis}
          />
        </div>

        {dashboardData && showChart && (
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
