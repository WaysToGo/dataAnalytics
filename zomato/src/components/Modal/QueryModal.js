import React, { Component, Fragment } from "react";
import Toggle from "../Common/Toogle.jsx";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QueryInput from "../Inputfield/QueryInput";
export default class QueryModal extends Component {
  render() {
    const { handleInputChange, state, handleNewQuerySubmit } = this.props;
    return (
      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <button onClick={toggle} className="btn dashboard-modal ">
              <i className="far fa-plus-square" />
              Query
            </button>
            <Modal show={on} onHide={toggle}>
              <Modal.Header closeButton>
                <Modal.Title>New Query</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <QueryInput
                  handleInputChange={handleInputChange}
                  state={state}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="dark"
                  onClick={event => {
                    toggle();
                    handleNewQuerySubmit();
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
