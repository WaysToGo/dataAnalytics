import React, { Component } from "react";

export default class NewDashboard extends Component {
  render() {
    const { state, handleInputChange, handleDhashboardSubmit } = this.props;
    return (
      <div className="form-wrapper">
        <div>
          <label>
            Name:
            <input
              type="text"
              name="dashboardName"
              value={state.dashboardName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Desctiption:
            <input
              type="text"
              name="dashboardDescription"
              value={state.dashboardDescription}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <button onClick={handleDhashboardSubmit} className="btn btn-default">
            submit
          </button>
        </div>
      </div>
    );
  }
}
