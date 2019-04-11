import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class DashboardInput extends Component {
  render() {
    const {
      handleInputChange,
      dashboardName,
      dashboardDescription
    } = this.props;
    return (
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="dashboardName"
            value={dashboardName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formQueryDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="dashboardDescription"
            value={dashboardDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
