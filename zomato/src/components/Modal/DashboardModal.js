import React, { Component, Fragment } from "react";
import Toggle from "../Common/Toogle.jsx";

import Modal from "react-bootstrap/Modal";
import DashboardInput from "../Inputfield/DashboardInput";
import Button from "react-bootstrap/Button";
import "./DashboardModal.css";

export default class DashboardModal extends Component {
  render() {
    const { handleInputChange, state, handleDhashboardSubmit } = this.props;
    return (
      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <button onClick={toggle} className="btn dashboard-modal ">
              <i className="far fa-plus-square" />
              Dashboard
            </button>

            <Modal show={on} onHide={toggle}>
              <Modal.Header closeButton>
                <Modal.Title> New Dashboard</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <DashboardInput
                  handleInputChange={handleInputChange}
                  state={state}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="dark"
                  onClick={event => {
                    toggle();
                    handleDhashboardSubmit();
                  }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </Fragment>
        )}
      </Toggle>
    );
  }
}
