import React, { Component } from "react";
import Loading from "../Common/Loading";
import LeftNav from "../Common/LeftNav";
import RightNav from "../Common/RightNav";

import "./HomePage.css";

import axios from "axios";

import Charts from "../Charts/Charts.js";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dashboardData: [],
      dashboardList: [],
      selectedDashboard: "",
      currentQuery: [],
      queryData: [],
      showCharts: false
    };
  }

  componentDidMount() {
    this.setState({
      dashboardList: JSON.parse(localStorage.getItem("dashboardList"))
    });
  }

  updateDashboardState = dashboardList => {
    this.setState({
      dashboardList
    });
  };
  updateSelectedDashboard = selectedDashboard => {
    this.setState({
      selectedDashboard,
      showCharts: false
    });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  updateSelectedQuery = (currentQuery, query) => {
    this.setState({
      currentQuery
    });
    this.fetchQueryData(query);
  };

  updateQueryDataState = queryData => {
    this.setState({
      queryData
    });
  };

  fetchQueryData = query => {
    this.setState({ loading: true });
    axios
      .get(`http://localhost:5000/query?query=${query}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          dashboardData: data,
          loading: false,
          showCharts: true
        });
      })
      .catch(error =>
        this.setState({ loading: false, error: "Sorry somthing went wrong" })
      );
  };

  render() {
    const {
      loading,
      error,
      dashboardList,
      selectedDashboard,
      queryData,
      currentQuery,
      showCharts,
      dashboardData
    } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div className="homepage-wrapper">
        <LeftNav
          dashboardList={dashboardList}
          updateCurrentDashboardInfo={this.updateCurrentDashboardInfo}
          selectedDashboard={selectedDashboard}
          updateDashboardState={this.updateDashboardState}
          updateSelectedDashboard={this.updateSelectedDashboard}
          updateQueryDataState={this.updateQueryDataState}
        />
        <main className="content-wrapper">
          <section>
            {showCharts && <Charts dashboardData={dashboardData} />}
          </section>
        </main>
        {selectedDashboard.length > 0 && (
          <RightNav
            queryData={queryData}
            dashboardList={dashboardList}
            updateSelectedQuery={this.updateSelectedQuery}
            currentQuery={currentQuery}
            selectedDashboard={selectedDashboard}
            updateDashboardState={this.updateDashboardState}
            updateQueryDataState={this.updateQueryDataState}
          />
        )}
      </div>
    );
  }
}
