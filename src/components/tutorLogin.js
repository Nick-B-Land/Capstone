import React, { Component } from "react";
import { Link } from "react-router-dom";

class TutorLogin extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Enter Tutor Information</h1>
        <div className="validateContainer">
          <form className="validateForm">
            <div className="form-group">
              <label for="tutorEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="tutorEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label for="validPass">Password</label>
              <input className="form-control" id="validPass" type="password" />
            </div>
            <div className="form-group validateBtn">
              <Link to="/tutordashboard">
                <button className="btn btn-lg btn-dark homeBtn">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TutorLogin;
