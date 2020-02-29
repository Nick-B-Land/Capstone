import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home.js";
import Nav from "./components/nav.js";
import StudentValidate from "./components/studentValidate.js";
import TutoringCategories from "./components/tutoringCategories.js";
import WaitListed from "./components/waitlisted.js";
import TutorLogin from "./components/tutorLogin.js";
import DashboardHome from "./components/dashboardHome.js";
import DashboardProf from "./components/dashboardProf.js";
import DashboardAnalytics from "./components/dashboardAnalytics.js";
import { observer } from "mobx-react";

const app = observer(
  class App extends Component {
    componentDidMount = () => {
      this.props.catStore.Fetch();
      let t = sessionStorage.getItem("Tutor");
      if (t) {
        this.props.tutorStore.Fetch();
      }
    };

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
              render={props => (
                <TutoringCategories {...props} catStore={this.props.catStore} />
              )}
            />
            <Route
              exact
              path="/waitlisted"
              render={props => <WaitListed {...props} />}
            />
            <Route
              exact
              path="/tutorlogin"
              render={props => <TutorLogin {...props} />}
            />
            <Route
              exact
              path="/tutordashboard"
              render={props => (
                <DashboardHome {...props} tutorStore={this.props.tutorStore} />
              )}
            />
            <Route
              exact
              path="/tutorprofile"
              render={props => (
                <DashboardProf {...props} tutorStore={this.props.tutorStore} />
              )}
            />
            <Route
              exact
              path="/tutoranalytics"
              render={props => (
                <DashboardAnalytics
                  {...props}
                  tutorStore={this.props.tutorStore}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      );
    }
  }
);

export default app;
