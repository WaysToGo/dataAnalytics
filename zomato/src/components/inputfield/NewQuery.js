import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class NewQuery extends Component {
  render() {
    const { state, handleInputChange } = this.props;
    return (
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="queryName"
            value={state.queryName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formQueryDescription">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            name="queryDescription"
            value={state.queryDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control
            type="text"
            name="querySql"
            value={state.querySql}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
