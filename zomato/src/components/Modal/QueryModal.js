import React, { Component, Fragment } from "react";
import Toggle from "../Common/Toogle.jsx";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NewQuery from "../Inputfield/NewQuery";
export default class QueryModal extends Component {
  render() {
    const { handleInputChange, state, handleNewQuerySubmit } = this.props;
    return (
      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <button onClick={toggle} className="btn dashboard-modal ">
              <i className="fas fa-plus" />
              Query
            </button>
            <Modal show={on} onHide={toggle}>
              <Modal.Header closeButton>
                <Modal.Title>Create New Query</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <NewQuery handleInputChange={handleInputChange} state={state} />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={event => {
                    toggle();
                    handleNewQuerySubmit();
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
