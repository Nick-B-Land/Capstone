import React, { Component } from "react";

class AppointmentTutorCurrentAppt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row d-flex justify-content-end">
        <div className="tutorActiveDiv">
          <div className="row">
            <div className="col-4 text-center">
              <h2>
                {this.state.minutes} : {this.state.seconds}
              </h2>
            </div>
            <div className="col-8 text-center">
              {" "}
              <h2>
                Student Name -
                {currentAppointment ? currentAppointment.studentID : "Oops"}
              </h2>{" "}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <h3>{this.setAppointmentStatus()}</h3>
          </div>
          <div className="row d-flex justify-content-between">
            {this.state.appointmentState === "readyToStart" ? (
              <button
                className="btn btn-lg qBtn lBtn"
                onClick={this.handleStartingAppointment}
              >
                {" "}
                Start Appointment
              </button>
            ) : (
              <button
                className="btn btn-lg qBtn lBtn"
                onClick={this.handleEndingAppointment}
              >
                {" "}
                End Appointment
              </button>
            )}
            {this.state.started ? null : (
              <button
                className="btn btn-lg qBtn rBtn d-flex flex-row-reverse"
                onClick={this.handleNoShow}
              >
                {" "}
                No Show
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentTutorCurrentAppt;
