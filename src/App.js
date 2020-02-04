import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home.js";
import Nav from "./components/nav.js";
import StudentValidate from "./components/studentValidate.js";
import TutoringCategories from "./components/tutoringCategories.js";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" render={props => <Home {...props} />} />
          <Route
            exact
            path="/validate"
            render={props => <StudentValidate {...props} />}
          />
          <Route
            exact
            path="/categories"
            render={props => <TutoringCategories {...props} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
