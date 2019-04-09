import React, { Component, Fragment } from "react";
import Loading from "../common/Loading.jsx";
import SideNav from "../common/SideNav.jsx";
import "./HomePage.css";
import Query from "../query/Query.js";

import axios from "axios";
import Toggle from "../common/Toogle.jsx";
import { Modal } from "../Elements";
import NewDashboard from "../inputfield/NewDashboard";
import NewQuery from "../inputfield/NewQuery.js";

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
      dashboards: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    axios
      .get(`http://localhost:5000/query?query=select * from city`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          dashboardData: data,
          loading: false
        });
      })
      .catch(error =>
        this.setState({ loading: false, error: "Sorry somthing went wrong" })
      );

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
    if (dashboards.length > 0) {
      dashboards.map(a => {
        if (a.name == this.state.name) {
          alert("name is already available ");
          toPush = false;
        }
      });
    }
    if (toPush) {
      dashboards.push(dashboard);
      this.setState({
        dashboards
      });
      localStorage.setItem("dashboards", JSON.stringify(dashboards));
    }
  };
  handleNewQuerySubmit = event => {
    alert("A name was submitted: " + this.state.queryName);
  };
  render() {
    const { loading, dashboardData, error } = this.state;
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
        <SideNav dashboards={this.state.dashboards} />
        <main className="content-wrapper">
          <section>
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle} className="btn btn-primary">
                    New DashBoard
                  </button>
                  <Modal on={on} toggle={toggle}>
                    <NewDashboard
                      handleInputChange={this.handleInputChange}
                      handleDhashboardSubmit={this.handleDhashboardSubmit}
                      state={this.state}
                    />
                  </Modal>
                </Fragment>
              )}
            </Toggle>
            <Query />
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle} className="btn btn-primary">
                    New query
                  </button>
                  <Modal on={on} toggle={toggle}>
                    <NewQuery
                      handleInputChange={this.handleInputChange}
                      handleNewQuerySubmit={this.handleNewQuerySubmit}
                      state={this.state}
                    />
                  </Modal>
                </Fragment>
              )}
            </Toggle>
          </section>
        </main>
        <SideNav />
      </div>
    );
  }
}
