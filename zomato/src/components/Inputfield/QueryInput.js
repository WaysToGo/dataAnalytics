import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class QueryInput extends Component {
  render() {
    const {
      handleInputChange,
      queryName,
      queryDescription,
      querySql
    } = this.props;
    return (
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="queryName"
            value={queryName}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formQueryDescription">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            name="queryDescription"
            value={queryDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formQuery">
          <Form.Label>Query</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="querySql"
            value={querySql}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>
    );
  }
}
