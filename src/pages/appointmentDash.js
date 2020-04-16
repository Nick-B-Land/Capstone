import React, { Component } from "react";
import PouchDB from "pouchdb";
import ApptSideNav from "../components/apptSideNav";
import AppointmentTutorList from "../components/appointmentTutorList";

class AppointmentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { bookedAppointments: null };
  }

  componentDidMount = async () => {
    let tID = sessionStorage.getItem("Appointment");
    console.log(tID);
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );
    this.fetchAppointments(tID);
    tDB
      .changes({ since: "now", live: true, include_docs: true })
      .on("change", () => {
        this.fetchAppointments(tID);
      });
  };

  fetchAppointments = async (tID) => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    let tutorPromise = new Promise((resolve, reject) => {
      tDB
        .get(tID)
        .then(function (doc) {
          resolve(doc.bookedAppointments);
        })
        .catch(function (err) {
          reject(err);
        });
    });

    let currentAppointments = await tutorPromise;
    this.setState({ bookedAppointments: currentAppointments });
  };

  render() {
    return (
      <div className="wrapper">
        <ApptSideNav
          tutorStore={this.props.tutorStore}
          history={this.props.history}
          analytics={this.handleAnalyticsScene}
          home={this.handleHomeScene}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <AppointmentTutorList
                appointments={this.state.bookedAppointments}
              />
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentDashboard;
