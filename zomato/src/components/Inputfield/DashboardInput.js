import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class DashboardInput extends Component {
  render() {
    const { state, handleInputChange } = this.props;
    return (
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="dashboardName"
            value={state.dashboardName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formQueryDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="dashboardDescription"
            value={state.dashboardDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
