import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  handleLogout = () => {
    this.props.tutorStore.Clear();
    this.props.history.push("/");
  };
  render() {
    return (
      <nav className="sideNav">
        <div className="sidebar-header">
          <h4>Welcome, {this.props.tutorStore.Tutor._id}</h4>
        </div>
        <ul className="list-unstyled components">
          <Link to="/tutordashboard">
            <li className="sideNavLI">Home</li>
          </Link>
          <Link to="/tutoranalytics">
            <li className="sideNavLI">Analytics</li>
          </Link>
          <Link>
            <li className="sideNavLI" onClick={this.handleLogout}>
              {" "}
              Logout{" "}
            </li>
          </Link>
        </ul>
        {/* <span>
          <button onClick={this.handleLogout} className="btn btn-dark">
            Logout
          </button>
        </span> */}
      </nav>
    );
  }
}

export default SideNav;
