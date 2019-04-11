import "./SideNav.css";
import React, { Component } from "react";
import QueryModal from "../Modal/QueryModal";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QueryInput from "../Inputfield/QueryInput";

export default class RightNav extends Component {
  static defaultProps = {
    initial: false
  };

  state = {
    on: this.props.initial
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };
  render() {
    const {
      queryData,
      updateQuery,
      state,
      handleInputChange,
      handleNewQuerySubmit,
      handleEdit,
      currentQuery,
      handleQueryDelete
    } = this.props;
    let dashboardItems = [];
    if (queryData) {
      dashboardItems = queryData.map(query => {
        return (
          <div
            onClick={() => updateQuery(query.name, query.query)}
            key={query.name}
            className={`dashboard-items w-75 d-flex justify-content-between ${
              query.name === currentQuery ? "selected" : ""
            }`}
          >
            {query.name}
            <span>
              <i
                className="far fa-edit pull-right "
                onClick={e => {
                  this.toggle();
                  handleEdit(e, query);
                }}
              />
              <i
                className="far fa-trash-alt pl-2"
                onClick={e => {
                  handleQueryDelete(e, query);
                }}
              />
            </span>
          </div>
        );
      });
    }

    return (
      <nav className="nav-bar">
        <div className="nav-header">
          <QueryModal
            handleNewQuerySubmit={handleNewQuerySubmit}
            state={state}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="nav-body">{dashboardItems}</div>

        <Modal show={this.state.on} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Update Query</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QueryInput handleInputChange={handleInputChange} state={state} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={event => {
                this.toggle();
                handleNewQuerySubmit();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </nav>
    );
  }
}
