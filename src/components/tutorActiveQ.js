import React, { Component } from "react";
import "../tutorActiveQ.css";

//
// Props
//
// activeQ - The current q object being served
//

// appointmentStates - readyToStart, Started, Extended, Ended

class TutorActiveQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      appointmentState: null,
      minutes: null,
      seconds: null,
      scene: "empty"
    };
  }

  componentDidMount = () => {
    // if (this.props.activeQ !== null)
    //   this.setState({ isFull: true, appointmentState: "readyToStart" });
  };

  componentDidUpdate = prevProps => {
    if (this.props.activeQ !== prevProps.activeQ) {
      this.setState({
        isFull: true,
        appointmentState: "readyToStart",
        scene: "appointmentReady"
      });
    }
  };

  setAppointmentStatus = () => {
    if (this.state.appointmentState === "readyToStart") {
      return "Appointment is ready to start";
    } else if (this.state.appointmentState === "started") {
      return "Appointment is started";
    } else if (this.state.appointmentState === "extended") {
      return "Appointment is extented";
    } else return "No appointment status";
  };

  renderActiveQ = () => {
    console.log("render active q fired");
    return (
      <div className="row d-flex justify-content-end">
        <div className="tutorActiveDiv">
          <div className="row">
            <div className="col-4 text-center">
              <h2>00:00</h2>
            </div>
            <div className="col-8 text-center">
              {" "}
              <h2>Student Name - {this.props.activeQ.studentID}</h2>{" "}
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <h3>{this.setAppointmentStatus()}</h3>
          </div>
          <div className="row d-flex justify-content-between">
            {this.state.appointmentState === "readyToStart" ? (
              <button className="btn btn-lg qBtn lBtn">
                {" "}
                Start Appointment
              </button>
            ) : (
              <button className="btn btn-lg  qBtn lBtn">
                {" "}
                End Appointment
              </button>
            )}
            <button className="btn btn-lg qBtn rBtn d-flex flex-row-reverse">
              {" "}
              No Show
            </button>
          </div>
        </div>
      </div>
    );
  };

  renderEmptyQ = () => {
    return (
      <div className="row d-flex justify-content-end">
        <div className="tutorActiveDiv">
          <div className="row">
            <h3>No Appointment Selected</h3>
          </div>
        </div>
      </div>
    );
  };

  renderScene = () => {
    if (this.state.scene === "empty") {
      return this.renderEmptyQ();
    } else if (this.state.scene === "appointmentReady") {
      return this.renderActiveQ();
    }
  };

  render() {
    return <div>{this.renderScene()}</div>;
  }
}

export default TutorActiveQ;
