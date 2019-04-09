import React, { Component } from "react";
import { getData } from "../../utilities/fetchUtil";

export default class Query extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", analyticsData: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    getData(`http://localhost:3000/query?query=${this.state.value}`)
      .then(data => console.log(JSON.stringify(data)))
      .then(data => {
        this.setState({
          analyticsData: data
        });
      })
      .catch(error =>
        this.setState({ loading: false, error: "Sorry somthing went wrong" })
      );
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <button className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}
