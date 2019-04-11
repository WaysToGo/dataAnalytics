import "./LeftNav.css";
import React, { Component } from "react";
import DashboardModal from "../Modal/DashboardModal";

export default class LeftNav extends Component {
  constructor() {
    super();
    this.state = {
      dashboardName: "",
      dashboardDescription: ""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  clearInutFields = () => {
    this.setState({
      dashboardName: "",
      dashboardDescription: ""
    });
  };

  handleAddToDhashboard = event => {
    const { dashboardName, dashboardDescription } = this.state;
    let dashboardList = this.props.dashboardList,
      toPush = true,
      dashboard = {
        name: dashboardName,
        description: dashboardDescription
      };
    if (dashboardList) {
      dashboardList.forEach(a => {
        if (a.name === dashboardName) {
          console.error("name is already available ");
          toPush = false;
        }
      });
    } else {
      dashboardList = [];
    }
    if (toPush) {
      dashboardList.push(dashboard);
      this.props.updateDashboardState(dashboardList);
      this.props.updateSelectedDashboard(dashboardName);
      this.props.updateQueryDataState([]);
      localStorage.setItem("dashboardList", JSON.stringify(dashboardList));
    }
    this.clearInutFields();
  };

  render() {
    const { dashboardName, dashboardDescription } = this.state;
    const {
      dashboardList,
      updateSelectedDashboard,
      selectedDashboard,
      updateQueryDataState
    } = this.props;
    let dashboardItems = [];

    if (dashboardList) {
      dashboardItems = dashboardList.map((dashboard, i) => {
        return (
          <div
            onClick={() => {
              updateSelectedDashboard(dashboard.name);
              updateQueryDataState(dashboard.queries);
            }}
            key={i}
            className={`dashboard-items ${
              dashboard.name === selectedDashboard ? "selected" : ""
            }`}
          >
            {dashboard.name}
          </div>
        );
      });
      dashboardItems.push();
    }

    return (
      <nav className="nav-bar left-side-nav ">
        <div className="nav-header">
          <DashboardModal
            handleAddToDhashboard={this.handleAddToDhashboard}
            dashboardName={dashboardName}
            dashboardDescription={dashboardDescription}
            handleInputChange={this.handleInputChange}
          />
        </div>
        <div className="nav-body">{dashboardItems}</div>
      </nav>
    );
  }
}
