import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home.js";
import Nav from "./components/nav.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
