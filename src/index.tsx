import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";

const exports = window as any;

exports.onYouTubeIframeAPIReady = () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};
