import React, { Component } from "react";
import { Link } from "react-router-dom";

class StudentValidate extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Enter Student Information</h1>
        <div className="validateContainer">
          <form className="validateForm">
            <div className="form-group">
              <label for="validEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="validEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label for="validID">Student ID</label>
              <input className="form-control" id="validID" />
            </div>
            <div className="form-group">
              <label for="validPhone">Phone Number</label>
              <input className="form-control" id="validPhone" />
            </div>
            <div className="form-group text-center">
              <label for="validProgram">Program</label>
              <select className="form-control text-center" id="validProgram">
                <option value="Writing">Writing</option>
                <option value="Reading">Reading</option>
                <option value="English">English</option>
                <option value="ct">Creative Technologies</option>
              </select>
            </div>
            <div className="form-group validateBtn">
              <Link to="/categories">
                <button className="btn btn-lg btn-dark homeBtn">
                  Get Tutoring
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentValidate;
