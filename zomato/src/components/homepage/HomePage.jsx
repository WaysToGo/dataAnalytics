import React, { Component, Fragment } from "react";
import Loading from "../Common/Loading.jsx";
import SideNav from "../Common/SideNav.jsx";
import RightNav from "../Common/RightNav.jsx";

import "./HomePage.css";

import axios from "axios";
import Toggle from "../Common/Toogle.jsx";

import NewDashboard from "../Inputfield/NewDashboard";
import NewQuery from "../Inputfield/NewQuery";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
  };
  updateDashboard = currentDashboard => {
    this.state.dashboards.map(a => {
      if (a.name === currentDashboard) {
        this.setState({
          queryData: a.queries,
          currentDashboard
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
        dashboards.map(a => {
          if (a.name === currentDashboard) {
            if (a.queries) {
              let copy = a.queries.slice();
              a.queries = [query, ...copy];
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
    } catch (error) {}
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
        />
        <main className="content-wrapper">
          <section>
            <Toggle>
              {({ on, toggle }) => (
                <Fragment>
                  <button onClick={toggle} className="btn btn-light">
                    CREATE DASHBOARD
                  </button>

                  <Modal show={on} onHide={toggle}>
                    <Modal.Header closeButton>
                      <Modal.Title>Create New Dashboard</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <NewDashboard
                        handleInputChange={this.handleInputChange}
                        state={this.state}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={event => {
                          toggle();
                          this.handleDhashboardSubmit();
                        }}
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Fragment>
              )}
            </Toggle>

            {currentDashboard.length > 0 && (
              <Toggle>
                {({ on, toggle }) => (
                  <Fragment>
                    <button onClick={toggle} className="btn btn-light ">
                      NEW QUERY
                    </button>
                    <Modal show={on} onHide={toggle}>
                      <Modal.Header closeButton>
                        <Modal.Title>Create New Query</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <NewQuery
                          handleInputChange={this.handleInputChange}
                          state={this.state}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="primary"
                          onClick={event => {
                            toggle();
                            this.handleNewQuerySubmit();
                          }}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Fragment>
                )}
              </Toggle>
            )}
            {showCharts && <Charts dashboardData={dashboardData} />}
          </section>
        </main>
        <RightNav
          queryData={queryData}
          updateQuery={this.updateQuery}
          currentQuery={currentQuery}
        />
      </div>
    );
  }
}
