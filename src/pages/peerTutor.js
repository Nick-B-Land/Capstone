import React, { Component } from "react";
import PouchDB from "pouchdb";
import StudentValidate from "./studentValidate";
import "../css/peerTutor.css";

class TutorOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerCategories: null,
      peerHistory: null,
      scene: "default",
      value: null,
      peerCategorie: "",
      date: "",
      time: null,
      Queue: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = async () => {
    this.fetchPeerTutoring();
    let s = sessionStorage.getItem("studentID");

    var today = new Date(),
      newdate =
        today.getMonth() +
        1 +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear(),
      newtime = today.getTime();
    this.setState({ date: newdate.toString() });
    this.setState({ time: newtime.toString() });
  };

  generateOptions = () => {
    let array = this.state.peerCategories;

    if (array !== null) {
      return array.map((e) => (
        <option value={e.id} key={e.id}>
          {e.id}
        </option>
      ));
    }
  };

  fetchPeerTutoring = async () => {
    let ptDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_categories"
    );

    let ptPromise = new Promise((resolve, reject) => {
      ptDB
        .allDocs({
          include_docs: true,
          attachments: true,
        })
        .then(function (docs) {
          resolve(docs.rows);
        })
        .catch(function (err) {
          reject(console.log(err));
        });
    });

    let ptResult = await ptPromise;
    await this.setState({ peerCategories: ptResult });
  };

  addStudentScene = () => {
    this.setState({ scene: "addStudent" });
  };

  handleChange = (event) => {
    this.setState({ scene: "PeerTutor" });
    this.setState({ peerCategorie: event.target.value });
    console.log(this.state.peerCategorie);
    this.getPeerTutorList();
  };

  addStudentToPeer = (e) => {
    let peerdb = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_history"
    );

    peerdb.put(e).catch(function (err) {
      console.log(err);
    });
  };

  getPeerTutorList = async () => {
    let ptDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_history"
    );

    let ptPromise = new Promise((resolve, reject) => {
      ptDB
        .allDocs({
          include_docs: true,
          attachments: true,
        })
        .then(function (docs) {
          resolve(docs.rows);
        })
        .catch(function (err) {
          reject(console.log(err));
        });
    });

    let ptResult = await ptPromise;
    await this.setState({ peerHistory: ptResult });
  };

  getQueue = () => {
    let array = this.state.peerHistory;
    if (array !== null) {
      return array.map((e) => {
        if (
          e.doc.department === this.state.peerCategorie &&
          e.doc.Date === this.state.date
        ) {
          let students = e.doc.Students;
          console.log(students);
          return students.map((a) => (
            <p key={a.student_id}> Student Id: {a.student_id}</p>
          ));
        }

        console.log(this.state.Queue);
        console.log("Date: " + this.state.date);
      });
    }
  };

  addStudentToQueue = (e) => {
    this.state.Queue.push(e);
    this.setState({ scene: "PeerTutor" });
  };

  renderQueue = () => {
    return this.state.Queue.map((e) => <h3 key={e}>Student Id: {e}</h3>);
  };

  renderStudentScene = () => {
    return (
      <StudentValidate
        date={this.state.date}
        time={this.state.time}
        scene={this.state.scene}
        queue={this.state.queue}
        peerCategorie={this.state.peerCategorie}
        addStudentToQueue={this.addStudentToQueue}
        addStudentToPeer={this.addStudentToPeer}
      />
    );
  };

  renderPeerTutorScene = () => {
    return (
      <div className="container">
        <div className="row d-flex flex-column">
          <h1 className="validateLead">{this.state.peerCategorie}</h1>
          <h3 className="validateLead">{this.state.date}</h3>
        </div>
        <div className="row">
          <div className="validateContainer">
            <div className="row">
              <div className="col">{this.renderQueue()}</div>
            </div>
            <div className="row">
              <button
                className="btn btn-block bookBtn"
                onClick={this.addStudentScene}
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderDefault = () => {
    return (
      <div className="container">
        <div className="row">
          <h1 className="validateLead">Please Select A Peer Tutor Catergory</h1>
        </div>
        <div className="row ">
          <div className="validateContainer  d-flex align-items-center">
            <select className="form-control" onChange={this.handleChange}>
              <option key="Def" value="Def">
                Select A Catergory
              </option>
              {this.generateOptions()}
            </select>
          </div>
        </div>
      </div>
    );
  };

  renderScene = () => {
    let scene = this.state.scene;
    if (scene === "default") return this.renderDefault();
    else if (scene === "addStudent") return this.renderStudentScene();
    else if (scene === "PeerTutor") return this.renderPeerTutorScene();
  };

  render() {
    return <>{this.renderScene()}</>;
  }
}

export default TutorOptions;
