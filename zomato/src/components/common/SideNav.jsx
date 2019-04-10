import "./SideNav.css";
import React, { Component } from "react";
import DashboardModal from "../Modal/DashboardModal";

export default class SideNav extends Component {
  render() {
    const {
      dashboards,
      updateDashboard,
      handleDhashboardSubmit,
      state,
      handleInputChange
    } = this.props;
    let dashboardItems = [];
    if (dashboards) {
      dashboardItems = dashboards.map(a => {
        return (
          <div
            onClick={() => updateDashboard(a.name)}
            key={a.description}
            className="dashboard-items"
          >
            {a.name}
          </div>
        );
      });
    }

    return (
      <nav className="nav-bar left-side-nav ">
        <div className="nav-header">
          <DashboardModal
            handleDhashboardSubmit={handleDhashboardSubmit}
            state={state}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="nav-body">{dashboardItems}</div>
      </nav>
    );
  }
}
