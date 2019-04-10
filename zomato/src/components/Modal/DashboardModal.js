import React, { Component, Fragment } from "react";
import Toggle from "../Common/Toogle.jsx";

import Modal from "react-bootstrap/Modal";
import NewDashboard from "../Inputfield/NewDashboard";
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
              <i className="fas fa-plus" />
              Dashboard
            </button>

            <Modal show={on} onHide={toggle}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Dashboard</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewDashboard
                  handleInputChange={handleInputChange}
                  state={state}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={event => {
                    toggle();
                    handleDhashboardSubmit();
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
