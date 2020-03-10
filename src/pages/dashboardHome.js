import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PouchDB from "pouchdb";
import SideNav from "../components/sideNav";
import QNote from "../components/qNote";

const dashboardHome = observer(
  class DashboardHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeAppointment: false,
        showAddNote: false,
        noteText: "",
        firstQID: null
      };
    }
    componentDidMount = async () => {
      let tID = sessionStorage.getItem("Tutor");
      this.props.tutorStore.Fetch(tID);
      let qDB = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
      );
      qDB
        .changes({ since: "now", live: true, include_docs: true })
        .on("change", () => {
          this.props.tutorStore.Fetch(tID);
        });
    };

    handleNoteText = e => {
      this.setState({ noteText: e.target.value });
    };

    isOdd = n => {
      if (n % 2 === 0) return true;
    };

    //needs formatting and styling, just to give a idea
    renderQList = () => {
      let minusCurrentQ = [];
      if (this.props.tutorStore.Queue.length !== 0) {
        let firstQ = this.props.tutorStore.Queue[0];
        this.props.tutorStore.Queue.forEach(e => {
          if (e.id < firstQ.id) firstQ = e;
        });
        minusCurrentQ = this.props.tutorStore.Queue.filter(
          e => e.id !== firstQ.id
        );
      }
      let counter = 0;
      if (this.props.tutorStore.Queue.length === 0) {
        return (
          <div className="col emptyQContainer">
            <p className="emptyQPara">No students currently in queue!</p>
          </div>
        );
      } else {
        return minusCurrentQ.map(e => (
          <div className="col">
            <div
              className={
                this.isOdd(counter++)
                  ? "trueQRow rounded bg-dark"
                  : "falseQRow rounded"
              }
              key={Math.random()}
            >
              Student ID: {e.studentID} | Time: {e.timeQueued}
            </div>
          </div>
        ));
      }
    };

    handleStartingAppointment = () => {
      let firstQ = this.props.tutorStore.Queue[0];
      this.props.tutorStore.Queue.forEach(e => {
        if (e.id < firstQ.id) firstQ = e;
      });
      if (firstQ) {
        this.props.tutorStore.StartAppointment(firstQ.id);
        this.setState({ activeAppointment: true });
      }
    };

    //repeating the same code for getting the id
    //it was causing infinite loops for some reason
    //when executed in the render function or component did mount
    //again needs to be refactored
    handleEndingAppointment = () => {
      let firstQ = this.props.tutorStore.Queue[0];
      this.props.tutorStore.Queue.forEach(e => {
        if (e.id < firstQ.id) firstQ = e;
      });
      if (firstQ) {
        this.props.tutorStore.EndAppointment(firstQ.id);
        this.setState({ activeAppointment: false });
      }
      this.props.tutorStore.GetQueue(this.props.tutorStore.Tutor.programID);
      this.renderQList();
      this.getCurrentQ();
    };

    handleShowAddNote = () => {
      this.setState({ showAddNote: !this.state.showAddNote });
    };

    handleNoteSubmit = () => {
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
      );

      let date = new Date();
      let today = date.toLocaleDateString();
      let noteObject = {
        date: today,
        tutor: sessionStorage.getItem("Tutor"),
        description: this.state.noteText
      };

      db.get(this.props.tutorStore.Queue[0].studentID).then(function(doc) {
        doc.notes.push(noteObject);
        return db.put(doc);
      });

      this.refs.noteTextRef.value = "";
    };

    //running into errors with asynchronous shit
    //ive set them to await, but shit still fires
    //before the fetch calls are complete sometimes, causing crashes
    //will need some more work and refactoring
    //should be its own component and pass the id as a prop
    getCurrentQ = () => {
      //this.fetchQNotes();
      console.log("getCurrentQ Called");
      let firstQ = this.props.tutorStore.Queue[0];
      if (firstQ) {
        this.props.tutorStore.Queue.forEach(e => {
          if (e.id < firstQ.id) firstQ = e;
        });
      }
      return (
        <div className="col currentQCard">
          <div className="card">
            <div className="card-header">Current Appointment</div>
            <div className="card-body">
              <div className="currentQBody">
                <span>
                  <h6>
                    Student ID :{" "}
                    <b>{firstQ ? firstQ.studentID : "Queue is empty"}</b>
                  </h6>
                </span>
                <div className="qBody">
                  {this.state.activeAppointment
                    ? "Appointment is started"
                    : firstQ
                    ? "Appointment ready to start"
                    : "No appointments"}
                </div>
                <br />
                {firstQ ? <QNote sID={firstQ.studentID} /> : null}
                <div className="qCardBtns">
                  <button
                    className="btn btn-dark qStartBtn"
                    onClick={this.handleStartingAppointment}
                  >
                    Start Appointment
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={this.handleShowAddNote}
                  >
                    Add Note
                  </button>
                  <button
                    className="btn btn-dark qEndBtn"
                    onClick={this.handleEndingAppointment}
                  >
                    End Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={this.state.showAddNote ? "showAddNote" : "hideAddNote"}
          >
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Write a Note</span>
              </div>
              <textarea
                className="form-control"
                ref="noteTextRef"
                aria-label="With textarea"
                onChange={this.handleNoteText}
              ></textarea>
            </div>
            <button className="btn btn-dark" onClick={this.handleNoteSubmit}>
              Submit Note
            </button>
          </div>
        </div>
      );
    };

    //the side nav bar should be its own component and needs to be cleaned up
    render() {
      return (
        <div class="wrapper">
          <SideNav
            tutorStore={this.props.tutorStore}
            history={this.props.history}
          />
          <div className="container">
            <div className="row row-cols-1">
              <h3 className="appointmentHead">Appointment Queue</h3>
              {this.renderQList()}
            </div>
            <div className="row">{this.getCurrentQ()}</div>
          </div>
        </div>
      );
    }
  }
);

export default dashboardHome;
