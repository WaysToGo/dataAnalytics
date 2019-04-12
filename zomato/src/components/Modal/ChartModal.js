import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ChartInput from "../Inputfield/ChartInput";
export default class ChartModal extends Component {
  render() {
    const {
      dashboardData,
      on,
      toggle,
      addChart,
      removeChart,
      handleChange,
      handleSubmit,
      chartData,
      xaxis,
      yaxis
    } = this.props;
    return (
      <Modal show={on} onHide={toggle} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Customise Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChartInput
            dashboardData={dashboardData}
            addChart={addChart}
            removeChart={removeChart}
            handleChange={handleChange}
            chartData={chartData}
            xaxis={xaxis}
            yaxis={yaxis}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={event => {
              toggle();
              handleSubmit(event);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
