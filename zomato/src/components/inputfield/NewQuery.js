import React, { Component } from "react";

export default class NewQuery extends Component {
  render() {
    const { state, handleInputChange, handleNewQuerySubmit } = this.props;
    return (
      <div className="form-wrapper">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="queryName"
            value={state.queryName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>
            Desctiption:
            <input
              type="text"
              name="queryDescription"
              value={state.queryDescription}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            SQL Query:
            <input
              type="text"
              name="querySql"
              value={state.querySql}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <button className="btn btn-default" onClick={handleNewQuerySubmit}>
            submit
          </button>
        </div>
      </div>
    );
  }
}
