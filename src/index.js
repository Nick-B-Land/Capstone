import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import CatStore from "./categoryStore";

ReactDOM.render(<App catStore={CatStore} />, document.getElementById("root"));
