import React, { Component } from "react";

//this should be its own component, just got lazy as I was building and testing
//currently does nothing
class CurrentQ extends Component {
  render() {
    return (
      <div className="col catCard">
        <div className="card">
          <div className="card-header">{firstQ.programID}</div>
          <div className="card-body">
            <span>
              <h6>
                Student ID : <b>{firstQ.studentID}</b>
              </h6>
            </span>
            <span>
              <button
                className="btn btn-dark"
                onClick={this.handleStartingAppointment}
              >
                Start Appointment
              </button>
              <button className="btn btn-dark">End Appointment</button>
              <button className="btn btn-dark">Extend</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentQ;
