import React, { Component } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import PouchDB from "pouchdb";
import SideNav from "../components/sideNav";
import QNote from "../components/qNote";
import DashboardAnalytics from "../components/dashboardAnalytics";
import TutorQList from "../components/tutorQList";
import TutorActiveQ from "../components/tutorActiveQ";

const dashboardHome = observer(
  class DashboardHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeAppointment: false,
        showAddNote: false,
        noteText: null,
        firstQID: null,
        minutes: 0,
        seconds: 0,
        scene: "home",
        interval: null,
        timeout: null,
        activeQ: null,
        ts: null,
        q: null
      };
    }
    componentDidMount = async () => {
      let tID = sessionStorage.getItem("Tutor");
      let response = await this.props.tutorStore.FetchTutor(tID);
      this.props.tutorStore.Tutor = response;
      await this.setState({ ts: response });
      this.props.tutorStore.Tutor = this.state.ts;
      let qResp = await this.props.tutorStore.FetchQueue();
      await this.setState({ q: qResp.activeQ });
      this.props.tutorStore.Queue = this.state.q;
      let qDB = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
      );
      qDB
        .changes({ since: "now", live: true, include_docs: true })
        .on("change", () => {
          this.props.tutorStore.Fetch(tID);
        });

      console.log(this.props.tutorStore.Queue);
    };

    handleNoteText = e => {
      this.setState({ noteText: e.target.value });
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

      if (
        this.props.tutorStore.Queue.length !== 0 &&
        this.state.noteText !== null
      ) {
        db.get(this.props.tutorStore.Queue[0].studentID)
          .then(function(doc) {
            doc.notes.push(noteObject);
            return db.put(doc);
          })
          .catch(function(err) {
            console.log(err);
          });
        this.refs.noteTextRef.value = "";
      }
    };

    renderHome = () => {
      const tid = sessionStorage.getItem("Tutor");
      console.log(tid);
      let currentAppointment = toJS(
        this.props.tutorStore.Tutor.activeAppointment,
        false
      );
      if (currentAppointment) {
        console.log(currentAppointment.studentID);
      }
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <TutorQList tutorStore={this.props.tutorStore} />
            </div>
            <div className="col-6 ">
              <TutorActiveQ
                activeQ={this.state.activeQ}
                tutorStore={this.props.tutorStore}
                tID={tid}
              />
              <div className="row">
                <QNote
                  sID={currentAppointment ? currentAppointment.studentID : null}
                />
              </div>
            </div>
          </div>
        </div>
      );
    };

    renderAnalyticsScene = () => {
      return <DashboardAnalytics tutorStore={this.props.tutorStore} />;
    };

    renderScene = () => {
      let scene = this.state.scene;
      if (scene === "home") return this.renderHome();
      else if (scene === "analytics") return this.renderAnalyticsScene();
    };

    handleAnalyticsScene = () => {
      this.setState({ scene: "analytics" });
      console.log(this.state.scene);
    };

    handleHomeScene = () => {
      this.setState({ scene: "home" });
    };

    //the side nav bar should be its own component and needs to be cleaned up
    render() {
      return (
        <div className="wrapper">
          <SideNav
            tutorStore={this.props.tutorStore}
            history={this.props.history}
            analytics={this.handleAnalyticsScene}
            home={this.handleHomeScene}
          />
          {this.renderScene()}
        </div>
      );
    }
  }
);

export default dashboardHome;
