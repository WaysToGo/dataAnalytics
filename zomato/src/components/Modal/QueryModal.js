import React, { Component } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QueryInput from "../Inputfield/QueryInput";
export default class QueryModal extends Component {
  render() {
    const {
      handleInputChange,
      queryName,
      queryDescription,
      querySql,
      handleQuerySave,
      on,
      toggle,
      title
    } = this.props;
    return (
      <Modal show={on} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QueryInput
            handleInputChange={handleInputChange}
            queryName={queryName}
            queryDescription={queryDescription}
            querySql={querySql}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={event => {
              toggle();
              handleQuerySave();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
