import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import PouchDB from "pouchdb";
import SideNav from "../components/sideNav";
import QNote from "../components/qNote";
import CountdownTimer from "../components/countdownTimer";

const dashboardHome = observer(
  class DashboardHome extends Component {
    constructor(props) {
      super(props);
      this.min = React.createRef();
      this.sec = React.createRef();
      this.state = {
        activeAppointment: false,
        showAddNote: false,
        noteText: "",
        firstQID: null,
        minutes: 0,
        seconds: 0,
        scene: "home"
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
      this.startTimer();
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

    renderTimeoutScene = () => {
      this.setState({ scene: "appointmentTimeout" });
      console.log("Timeout fired");
    };

    handleExtend = () => {
      this.setState({ scene: "extendedAppointment" });
    };

    extendTimer = () => {
      // this.setState({ minutes: 0 });
      // this.setState({ seconds: 0 });
      this.timer = setInterval(async () => {
        if (this.refs.sec.value < 60) this.refs.sec.value += 1;
        // await this.setState({
        //   seconds: this.state.seconds + 1
        // });

        if (this.refs.sec.value === 60) {
          if (this.state.minutes === 15) clearInterval(this.timer);
          else {
            // await this.setState({
            //   minutes: this.state.minutes + 1
            // });
            // await this.setState({ seconds: 0 });
            this.refs.min.value += 1;
            this.refs.sec.value += 1;
          }
        }
      }, 1000);
    };

    startTimer = async () => {
      //this is the proper value to use, for testing just setting to a minute
      //await this.setState({ minutes: this.props.tutorStore.QLength });
      await this.setState({ minutes: 1 });
      let t = this.state.minutes * 60000;
      console.log(t);
      let interval = setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState({ seconds: this.state.seconds - 1 });
        }

        // if (this.state.seconds < 10) {
        //   this.setState({ seconds: "0" + this.state.seconds });
        // }

        if (this.state.seconds === 0) {
          if (this.state.minutes === 0) {
            clearInterval(interval);
          } else {
            this.setState({ minutes: this.state.minutes - 1 });
            this.setState({ seconds: 59 });
          }
        }
      }, 1000);

      setTimeout(this.renderTimeoutScene, t);
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
                {this.state.activeAppointment
                  ? this.state.minutes + " : " + this.state.seconds
                  : null}
                <br />
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

    renderHome = () => {
      return (
        <div className="container">
          <div className="row row-cols-1">
            <h3 className="appointmentHead">Appointment Queue</h3>
            {this.renderQList()}
          </div>
          <div className="row">{this.getCurrentQ()}</div>
        </div>
      );
    };

    renderTimeoutOptions = () => {
      return (
        <div className="container">
          <div className="col">
            <div className="card">
              <div className="card-header"> Appointment time is up!</div>
              <div className="card-body">
                <h3>Please pick a option</h3>
                <br />
                <br />
                <span>
                  <button className="btn btn-dark btn-lg">
                    End Appointment
                  </button>
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={this.handleExtend}
                  >
                    Extend
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    };

    renderExtendScene = () => {
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
                <div className="qBody">Appointment is extended</div>
                <br />
                {/* {this.state.minutes + " : " + this.state.seconds} */}
                {/* {this.refs.min.value + " : " + this.refs.sec.value} */}
                <CountdownTimer />
                <br />
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

    renderScene = () => {
      let scene = this.state.scene;

      if (scene === "home") return this.renderHome();
      else if (scene === "appointmentTimeout")
        return this.renderTimeoutOptions();
      else if (scene === "extendedAppointment") return this.renderExtendScene();
    };

    //the side nav bar should be its own component and needs to be cleaned up
    render() {
      return (
        <div class="wrapper">
          <SideNav
            tutorStore={this.props.tutorStore}
            history={this.props.history}
          />
          {this.renderScene()}
        </div>
      );
    }
  }
);

export default dashboardHome;
