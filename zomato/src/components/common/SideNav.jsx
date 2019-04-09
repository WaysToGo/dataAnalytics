import "./SideNav.css";
import React, { Component } from "react";

export default class SideNav extends Component {
  render() {
    const { dashboards } = this.props;
    console.log(dashboards);
    let dashboardItems = [];
    if (dashboards) {
      dashboardItems = dashboards.map(a => {
        return <div key="a.name">{a.name}</div>;
      });
    }
    return (
      <nav className="navbar">
        <div className="nav-header">Zomato</div>
        <div className="nav-body">{dashboardItems}</div>
      </nav>
    );
  }
}
