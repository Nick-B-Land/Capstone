import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardHome extends Component {
  state = {};

  componentDidMount = () => {
    this.props.tutorStore.Fetch();
    let y = this.props.tutorStore.Tutor.programID;
    let x = this.props.tutorStore.GetQueue(y);
    console.log(x);
  };

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
            <Link to="/tutordashboard">
              <li>Home</li>
            </Link>
            <Link to="/tutorprofile">
              <li>Profile</li>
            </Link>
            <Link to="/tutoranalytics">
              <li>Analytics</li>
            </Link>
          </ul>
        </nav>
        <div id="content">
          <div class="container">
            <div className="row">
              <div>
                <h2 id="dashboardtitle">Queue</h2>
                <div className="col-10">
                  <ul class="list-group list-group-vertical" id="studentlist">
                    <li class="list-group-item disabled">Student Name</li>
                    <li class="list-group-item active">Student Name</li>
                    <li class="list-group-item">Student Name</li>
                  </ul>
                </div>
              </div>
              <div className="col-2">
                <div class="dropdown" id="dropdowntutor">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Select Reason
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    Finished No Show Cancelled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardHome;
