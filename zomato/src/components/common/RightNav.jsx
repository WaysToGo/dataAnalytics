import "./SideNav.css";
import React, { Component } from "react";

export default class RightNav extends Component {
  render() {
    const { queryData, updateQuery } = this.props;
    let dashboardItems = [];
    if (queryData) {
      dashboardItems = queryData.map(a => {
        return (
          <div
            onClick={() => updateQuery(a.name, a.query)}
            key={a.name}
            className="dashboard-items "
          >
            {a.name}
          </div>
        );
      });
    }

    return (
      <nav className="nav-bar">
        <div className="nav-header ">
          {" "}
          <i className="fas fa-cog" />
          Query
        </div>
        <div className="nav-body">{dashboardItems}</div>
      </nav>
    );
  }
}
