import React, { Component } from "react";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div class="wrapper">
        <nav id="sidebar">
          <div class="sidebar-header">
            <h3>Tutor Dashboard</h3>
          </div>

          <ul class="list-unstyled components">
            <li class="active">
              <ul class="collapse list-unstyled" id="pageSubmenu"></ul>
            </li>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Analytics</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Dashboard;
