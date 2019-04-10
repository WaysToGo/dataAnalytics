import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class ChartForm extends Component {
  render() {
    const {
      state,
      handleDropdownChange,
      DynamicDropdown,
      handleInputChange
    } = this.props;
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Choose Chart</Form.Label>
            <Form.Control
              as="select"
              onChange={handleInputChange}
              value={state.selectedChart}
            >
              <option>AreaChart</option>
              <option>BarChart</option>
              <option>LineChart</option>
              {/* <option>Custom</option> */}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formChartLabel">
            <Form.Label>X-label</Form.Label>
            <Form.Control
              type="text"
              name="xLabel"
              value={state.xLabel}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
