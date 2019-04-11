import React, { Component, Fragment } from "react";
import QueryModal from "../Modal/QueryModal";

export default class RightNav extends Component {
  constructor() {
    super();
    this.state = {
      on: false,
      queryName: "",
      queryDescription: "",
      querySql: "",
      title: ""
    };
  }

  handleQuerySave = () => {
    let dashboardList = this.props.dashboardList;
    let selectedDashboard = this.props.selectedDashboard;
    let updateQueryDataState = this.props.updateQueryDataState;
    let query = {
      name: this.state.queryName,
      description: this.state.queryDescription,
      query: this.state.querySql
    };

    try {
      if (dashboardList && dashboardList.length > 0) {
        let sendCopy = false;
        dashboardList.forEach(dashboardItem => {
          if (dashboardItem.name === selectedDashboard) {
            if (dashboardItem.queries) {
              let copy = dashboardItem.queries.slice();
              copy.forEach(queryItem => {
                if (queryItem.name === query.name) {
                  queryItem.description = query.description;
                  queryItem.query = query.query;
                  sendCopy = true;
                }
              });
              if (sendCopy) {
                dashboardItem.queries = [...copy];
              } else {
                dashboardItem.queries = [query, ...copy];
              }
            } else {
              dashboardItem.queries = [];
              dashboardItem.queries = [query];
            }

            updateQueryDataState(dashboardItem.queries);
          }
        });
        localStorage.setItem("dashboardList", JSON.stringify(dashboardList));
      }
    } catch (error) {
      console.error("issue while adding values ");
    }
    this.clearInutFields();
  };

  handleQueryEdit = (e, query) => {
    e.stopPropagation();
    this.setState({
      queryName: query.name,
      queryDescription: query.description,
      querySql: query.query
    });
  };

  handleQueryDelete = (e, query) => {
    e.stopPropagation();
    let dashboardList = this.props.dashboardList;
    let selectedDashboard = this.props.selectedDashboard;
    let queryName = e.target.parentElement.parentElement.innerText.toLocaleLowerCase();
    let dashboardIndex = -1;
    let queryIndex = -1;
    try {
      if (dashboardList && dashboardList.length > 0) {
        dashboardList.forEach((dashboard, index) => {
          if (dashboard.name === selectedDashboard) {
            dashboardIndex = index;
            if (dashboard.queries) {
              dashboard.queries.forEach((query, i) => {
                if (query.name.toLocaleLowerCase() === queryName) {
                  queryIndex = i;
                }
              });
            }
          }
        });
        if (~dashboardIndex && ~queryIndex) {
          dashboardList[dashboardIndex].queries.splice(queryIndex, 1);
          this.props.updateDashboardState(dashboardList);
        }

        localStorage.setItem("dashboardList", JSON.stringify(dashboardList));
      }
    } catch (error) {}
  };

  clearInutFields = () => {
    this.setState({
      queryName: "",
      queryDescription: "",
      querySql: ""
    });
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  changeTitle = title => {
    this.setState({
      title
    });
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    const { queryData, updateSelectedQuery, currentQuery } = this.props;
    const { queryName, queryDescription, querySql, on, title } = this.state;
    let queryList = [];
    if (queryData) {
      queryList = queryData.map((query, i) => {
        return (
          <div
            onClick={() => updateSelectedQuery(query.name, query.query)}
            key={i}
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
                  this.changeTitle("Update Query");
                  this.handleQueryEdit(e, query);
                }}
              />
              <i
                className="far fa-trash-alt pl-2"
                onClick={e => {
                  this.handleQueryDelete(e, query);
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
          <Fragment>
            <button
              onClick={() => {
                this.toggle();
                this.changeTitle("New Query");
                this.clearInutFields();
              }}
              className="btn dashboard-modal "
            >
              <i className="far fa-plus-square" />
              Query
            </button>
            <QueryModal
              handleQuerySave={this.handleQuerySave}
              queryName={queryName}
              queryDescription={queryDescription}
              querySql={querySql}
              handleInputChange={this.handleInputChange}
              on={on}
              toggle={this.toggle}
              title={title}
            />
          </Fragment>
        </div>

        <div className="nav-body">{queryList}</div>
      </nav>
    );
  }
}
