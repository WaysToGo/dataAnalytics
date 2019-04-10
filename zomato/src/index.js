import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./components/Homepage/HomePage.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
      </Switch>
    </BrowserRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
