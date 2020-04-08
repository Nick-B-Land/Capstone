import React, { Component } from "react";
import Calendar from "react-calendar";
import PouchDB from "pouchdb";
import "react-calendar/dist/Calendar.css";
import "../css/categoryAppointmentBooking.css";
import AppointmentBookingRow from "./appointmentBookingRow";

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
      selectedTimes: [],
    };
  }

  componentDidMount = () => {};

  handleCalenderChange = (e) => {
    this.setState({ date: e });
    if (this.state.date !== null) console.log(this.state.date.getDate());
  };

  getAvailableTimes = (day, month) => {
    let availableTimes = [
      9,
      9.5,
      10,
      10.5,
      11,
      11.5,
      12,
      12.5,
      13,
      13.5,
      14,
      14.5,
      15,
      15.5,
      16,
      16.5,
    ];

    this.props.tutor.bookedAppointments.forEach((e) => {
      let date = new Date(e.date);
      let startH, endH, startM, endM;
      if (
        this.state.date.getDay() === date.getDay() &&
        this.state.date.getMonth() === date.getMonth()
      ) {
        let startColon = e.startTime.indexOf(":");
        let endColon = e.endTime.indexOf(":");
        let start24 = e.startTime.substr(e.startTime.length - 2);
        let end24 = e.endTime.substr(e.endTime.length - 2);

        if (startColon === 1) {
          startH = parseInt(e.startTime.charAt(0));
          if (start24 === "PM") {
            if (startH === 12) startH = 0;
            else startH = startH + 12;
          }
        } else if (startColon === 2) {
          startH = parseInt(e.startTime.substr(0, 2));
          if (start24 === "PM") {
            if (startH === 12) startH = 0;
            else startH = startH + 12;
          }
        }

        if (endColon === 1) {
          endH = parseInt(e.endTime.charAt(0));
          if (end24 === "PM") {
            if (endH === 12) endH = 0;
            else endH = endH + 12;
          }
        } else if (endColon === 2) {
          endH = parseInt(e.endTime.substr(0, 2));
          if (end24 === "PM") {
            if (endH !== 12) endH += 12;
          }
        }

        startM = parseInt(e.startTime.substr(startColon + 1, startColon + 2));
        endM = parseInt(e.endTime.substr(endColon + 1, endColon + 2));
        if (startM !== 0) startH += 0.5;
        if (endM !== 0) endH += 0.5;

        console.log(startH + " " + endH);

        for (let i = availableTimes.length - 1; i >= 0; --i) {
          if (availableTimes[i] >= startH && availableTimes[i] < endH) {
            console.log(availableTimes[i]);
            availableTimes.splice(i, 1);
            console.log(availableTimes[i]);
          }
        }
      }
    });

    return availableTimes;
  };

  handleRowClick = (e) => {
    let sArray = this.state.selectedTimes;
    sArray.push(e);
    this.setState({ selectedTimes: sArray });
  };

  renderDayAppointments = () => {
    let availableTimes = this.getAvailableTimes();

    return availableTimes.map((e) => (
      <AppointmentBookingRow timeSlot={e} rowClick={this.handleRowClick} />
    ));
  };

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
          <div className="col">{this.renderDayAppointments()}</div>
        </div>
      </div>
    );
  };

  convertAppointmentTime = (time) => {
    if (time === 9) return "9:00:00 AM";
    else if (time === 9.5) return "9:30:00 AM";
    else if (time === 10) return "10:00:00 AM";
    else if (time === 10.5) return "10:30:00 AM";
    else if (time === 11) return "11:00:00 AM";
    else if (time === 11.5) return "11:30:00 AM";
    else if (time === 12) return "12:00:00 PM";
    else if (time === 12.5) return "12:30:00 PM";
    else if (time === 13) return "1:00:00 PM";
    else if (time === 13.5) return "1:30:00 PM";
    else if (time === 14) return "2:00:00 PM";
    else if (time === 14.5) return "2:30:00 PM";
    else if (time === 15) return "3:00:00 PM";
    else if (time === 15.5) return "3:30:00 PM";
    else if (time === 16) return "4:00:00 PM";
    else if (time === 16.5) return "4:30:00 PM";
  };

  handleBooking = () => {
    console.log(this.state.selectedTimes.length);
    if (
      this.state.selectedTimes.length <= 0 ||
      this.state.selectedTimes.length > 3
    ) {
      alert("Invalid time selection");
      this.setState({ selectedTimes: [] });
      return;
    }

    if (
      this.state.selectedTimes[1] - this.state.selectedTimes[0] > 0.5 ||
      this.state.selectedTimes[2] - this.state.selectedTimes[1] > 0.5
    ) {
      alert("Time slots must follow eachother");
      this.setState({ selectedTimes: [] });
      return;
    }

    let studentID = sessionStorage.getItem("studentID");
    let d = new Date();
    let date = this.state.date.toLocaleDateString();
    let startTime = this.convertAppointmentTime(this.state.selectedTimes[0]);
    let endTime = this.convertAppointmentTime(
      this.state.selectedTimes[this.state.selectedTimes.length - 1] + 0.5
    );

    let appointment = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      studentID: studentID,
    };

    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    tDB
      .get(this.props.tutor._id)
      .then(function (doc) {
        doc.bookedAppointments.push(appointment);
        return tDB.put(doc);
      })
      .then(function (doc) {
        return tDB.get(this.props.tutor._id);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.props.mainScene();
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
        <div className="row">
          <div className="col">
            <button className="btn btn-lg bookBtn" onClick={this.handleBooking}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryAppointmentBooking;
