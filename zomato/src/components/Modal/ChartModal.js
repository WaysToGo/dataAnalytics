import React, { Component, Fragment } from "react";
import Toggle from "../Common/Toogle.jsx";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ChartForm from "../Inputfield/ChartForm";
import "./DashboardModal.css";
import "./ChartModal.css";

export default class ChartModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { state, createChart, handleInputChange } = this.props;
    return (
      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <div className="d-flex flex-row-reverse m-2 chart-modal">
              <button onClick={toggle} className="btn btn-outline-dark">
                <i className="fas fa-plus" />
              </button>
            </div>
            <Modal show={on} onHide={toggle}>
              <Modal.Header closeButton>
                <Modal.Title>New Chart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ChartForm
                  state={state}
                  handleInputChange={handleInputChange}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={event => {
                    toggle();
                    createChart();
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Fragment>
        )}
      </Toggle>
    );
  }
}
