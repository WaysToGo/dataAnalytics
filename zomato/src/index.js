import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./components/Homepage/HomePage.js";
import "./index.css";

const App = () => {
  return <HomePage />;
};
ReactDOM.render(<App />, document.getElementById("root"));
