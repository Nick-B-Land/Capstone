import React, { Component } from "react";
import Calendar from "react-calendar";
import PouchDB from "pouchdb";
import "react-calendar/dist/Calendar.css";

//
// Props -
//
// tutor: tutor the student is trying to book
// mainScene: function to change scene of parent component on btn click
//

// ----- TODO -----
//
// Need function build times that are available for the given day
// loop through tutor.bookedAppointments to see what's taken
// return avail times, user then can click on one to select, then a btn click
// makes the db call to add the appointment to the tutors booked appointments
//
// one function returns available times, other uses that result to build available
// times
//

class CategoryAppointmentBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount = () => {};

  handleCalenderChange = (e) => {
    this.setState({ date: e });
    if (this.state.date !== null) console.log(this.state.date.getDate());
  };

  getAvailableTimes = (day, month) => {
    let availableTimes = [];

    this.props.tutor.bookedAppointments.forEach((e) => {});
  };

  renderDayAppointments = () => {};

  renderDayView = () => {
    return (
      <div className="col">
        <div className="row d-flex justify-content-center">
          <div className="col">
            <h3>
              {this.state.date
                ? this.state.date.getMonth() + " " + this.state.date.getDate()
                : "No Date"}
            </h3>
            <h3>Available Appointments</h3>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    );
  };

  render() {
    let date = this.state.date;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <button
              className="btn btn-lg btn-dark"
              onClick={this.props.mainScene}
            >
              Back
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Calendar
              defaultValue={new Date()}
              onChange={this.handleCalenderChange}
              value={this.state.date}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">{this.renderDayView()}</div>
        </div>
      </div>
    );
  }
}

export default CategoryAppointmentBooking;
