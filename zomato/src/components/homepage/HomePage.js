import React, { Component } from "react";
import Loading from "../Common/Loading.jsx";
import SideNav from "../Common/SideNav.jsx";
import RightNav from "../Common/RightNav.jsx";

import "./HomePage.css";

import axios from "axios";

import Charts from "../Charts/Charts.js";

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      dashboardData: [],
      dashboardName: "",
      dashboardDescription: "",
      queryName: "",
      queryDescription: "",
      querySql: "",
      dashboards: [],
      currentDashboard: [],
      currentQuery: [],
      queryData: [],
      showCharts: false
    };
  }

  componentDidMount() {
    this.setState({ loading: false });

    this.setState({
      dashboards: JSON.parse(localStorage.getItem("dashboards"))
    });
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

  handleDhashboardSubmit = event => {
    let dashboards = this.state.dashboards;
    let toPush = true;
    let dashboard = {
      name: this.state.dashboardName,
      description: this.state.dashboardDescription
    };
    console.log(dashboards);
    if (dashboards) {
      dashboards.forEach(a => {
        if (a.name === this.state.name) {
          alert("name is already available ");
          toPush = false;
        }
      });
    } else {
      dashboards = [];
    }
    if (toPush) {
      dashboards.push(dashboard);
      this.setState({
        dashboards,
        currentDashboard: this.state.dashboardName
      });
      localStorage.setItem("dashboards", JSON.stringify(dashboards));
    }
    this.clearFields();
  };
  updateDashboard = currentDashboard => {
    this.state.dashboards.forEach(dashboard => {
      if (dashboard.name === currentDashboard) {
        this.setState({
          queryData: dashboard.queries,
          currentDashboard,
          showCharts: false
        });
      }
    });
  };
  updateQuery = (currentQuery, query) => {
    this.setState({
      currentQuery
    });
    this.fetchQueryData(query);
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

  handleNewQuerySubmit = event => {
    let dashboards = this.state.dashboards;
    let currentDashboard = this.state.currentDashboard;
    let query = {
      name: this.state.queryName,
      description: this.state.queryDescription,
      query: this.state.querySql
    };

    try {
      if (dashboards && dashboards.length > 0) {
        let sendCopy = false;
        dashboards.forEach(a => {
          if (a.name === currentDashboard) {
            if (a.queries) {
              let copy = a.queries.slice();
              copy.forEach(b => {
                if (b.name === query.name) {
                  b.description = query.description;
                  b.query = query.query;
                  sendCopy = true;
                }
              });
              if (sendCopy) {
                a.queries = [...copy];
              } else {
                a.queries = [query, ...copy];
              }
            } else {
              a.queries = [];
              a.queries = [query];
            }
            this.setState({
              queryData: a.queries
            });
          }
        });
        localStorage.setItem("dashboards", JSON.stringify(dashboards));
      }
    } catch (error) {
      console.error("issue while adding values ");
    }
    this.clearFields();
  };

  handleEdit = (e, query) => {
    e.stopPropagation();
    this.setState({
      queryName: query.name,
      queryDescription: query.description,
      querySql: query.query
    });
  };

  handleQueryDelete = (e, query) => {
    e.stopPropagation();
    let dashboards = this.state.dashboards;
    let currentDashboard = this.state.currentDashboard;
    let queryName = this.state.queryName;
    let dashboardIndex = -1;
    let queryIndex = -1;
    try {
      if (dashboards && dashboards.length > 0) {
        dashboards.forEach((dashboard, index) => {
          if (dashboard.name === currentDashboard) {
            dashboardIndex = index;
            if (dashboard.queries) {
              dashboard.queries.forEach((query, i) => {
                if (query.name === queryName) {
                  queryIndex = i;
                }
              });
            }
          }
        });
        if (~dashboardIndex && ~queryIndex) {
          dashboards[dashboardIndex].queries.splice(queryIndex, 1);
          this.setState({
            dashboards
          });
        }

        localStorage.setItem("dashboards", JSON.stringify(dashboards));
      }
    } catch (error) {}
  };

  clearFields = () => {
    this.setState({
      dashboardName: "",
      dashboardDescription: "",
      queryName: "",
      queryDescription: "",
      querySql: ""
    });
  };

  render() {
    const {
      loading,
      error,
      dashboards,
      currentDashboard,
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
        <SideNav
          dashboards={dashboards}
          updateDashboard={this.updateDashboard}
          currentDashboard={currentDashboard}
          handleDhashboardSubmit={this.handleDhashboardSubmit}
          state={this.state}
          handleInputChange={this.handleInputChange}
        />
        <main className="content-wrapper">
          <section>
            {showCharts && <Charts dashboardData={dashboardData} />}
          </section>
        </main>
        {currentDashboard.length > 0 && (
          <RightNav
            queryData={queryData}
            updateQuery={this.updateQuery}
            currentQuery={currentQuery}
            handleNewQuerySubmit={this.handleNewQuerySubmit}
            state={this.state}
            handleInputChange={this.handleInputChange}
            currentDashboard={this.currentDashboard}
            handleEdit={this.handleEdit}
            handleQueryDelete={this.handleQueryDelete}
          />
        )}
      </div>
    );
  }
}
