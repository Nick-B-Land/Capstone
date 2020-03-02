import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  state = {};
  render() {
    return (
      <nav className="sideNav">
        <div className="sidebar-header">
          <h4>Welcome, {this.props.tutorStore.Tutor._id}</h4>
        </div>
        <ul className="list-unstyled components">
          <Link to="/tutordashboard">
            <li className="sideNavHover">Home</li>
          </Link>
          <Link to="/tutorprofile">
            <li>Profile</li>
          </Link>
          <Link to="/tutoranalytics">
            <li>Analytics</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default SideNav;
