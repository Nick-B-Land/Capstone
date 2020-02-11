import React, { Component } from "react";
import { Link } from "react-router-dom";

class DashboardAnalytics extends Component {
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
        <div class="container dashAnal">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of Appointments Today</h5>
                  </span>
                  <span>
                    <h6>5</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of Students Cancelled</h5>
                  </span>
                  <span>
                    <h6>2</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Average Length of Sessions</h5>
                  </span>
                  <span>
                    <h6>30min</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of No Shows</h5>
                  </span>
                  <span>
                    <h6>1</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Hours Worked</h5>
                  </span>
                  <span>
                    <h6>7.5</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardAnalytics;
