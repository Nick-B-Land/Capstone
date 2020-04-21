import React, { Component } from "react";
import PouchDB from "pouchdb";
import "../css/adminTutor.css";
import AdminPeerCatRender from "./adminPeerCatRender";

class AdminPeerCat extends Component {

// --- PROPS ---
// currentPeerCat: fetchPeerCat()
// departmentInput: handleDepNameInput()
// showAdd: handleAddVisibility()
// addBtnState: handleDepNameInput()
// --- PROPS ---

  constructor(props) {
    super(props);
    this.state = {
      currentPeerCat: [],
      departmentInput: "",
      showAdd: false,
      addBtnState: false,
    };
  }

  componentDidMount = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_categories"
    );

    tDB
      .changes({ since: "now", live: true, include_docs: true })
      .on("change", () => {
        this.fetchPeerCat();
      });

    await this.fetchPeerCat();
    console.log(this.state.currentPeerCat);
  };

  // hanleDepNameInput takes the value that the user inputed within the
  // the deparementname input and passes it to departmentInput within the state
  // and it also sets addbtnState to true within state
  handleDepNameInput = (e) => {
    this.setState({ addBtnState: true, departmentInput: e.target.value });
  };

  // handleAddVisiblity sets the showAdd within state to not what is now (if false - turns to true, if true - turns to false).
  handleAddVisibility = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  // handleUpdates gets the PeerCat within and asynce call
  handleUpdates = async () => {
    await this.fetchPeerCat;
  };

  // fetchPeerCat does an async call to the database of peer_categories
  // and fetches all that data from the docs within the database
  // and sets cureentPeerCat within state to the results that were fetched from the database
  fetchPeerCat = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_categories"
    );

    let tPromise = new Promise((resolve, reject) => {
      tDB
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

    let tResult = await tPromise;
    await this.setState({ currentPeerCat: tResult });
  };

  isOdd = (n) => {
    if (n % 2 === 0) return true;
    else return false;
  };

  // renderPeerCat renders all the information from the curentPeerCat and maps our the data
  renderPeerCat = () => {
    let counter = 0;
    return this.state.currentPeerCat.map((e) => (
      <AdminPeerCatRender
        rowType={this.isOdd(counter++)}
        id={e.doc._id}
        department={e.doc.department}
        mondayTimes={e.doc.mondayTimes}
        tuesdayTimes={e.doc.tuesdayTimes}
        wednesdayTimes={e.doc.wednesdayTimes}
        thursdayTimes={e.doc.thursdayTimes}
        fridayTimes={e.doc.fridayTimes}
      />
    ));
  };

  // handlePeerCatDep calls the database of peer_categories and creates an object
  // called peerCatDepObject and pushes this object to a new doc within the database
  handlePeerCatDep = () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_categories"
    );

    let peerCatDepObj = {
      _id: this.state.departmentInput,
      department: this.state.departmentInput,
      mondayTimes: [],
      tuesdayTimes: [],
      wednesdayTimes: [],
      thursdayTimes: [],
      fridayTimes: [],
    };

    tDB.put(peerCatDepObj).catch(function (err) {
      console.log(err);
    });
    this.handleAddVisibility();
  };

  // renderAddPeerCat renders inputs to add a new Categiory to the database and takes user Inputs
  renderAddPeerCat = () => {
    return (
      <>
        <div>
          <div className="col">
            <div className="row d-flex justify-content-around">
              <button
                className="btn btn-lg tutorBtn"
                onClick={this.handleAddVisibility}
              >
                Add New Department
              </button>
            </div>
          </div>
        </div>
        <div className={this.state.showAdd ? "showEdit" : "hideEdit"}>
          <div className="container">
            <div className="row d-flex falseEditRow">
              <div className="col-12 text-center">
                <h3>New Department</h3>
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Department Name</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleDepNameInput}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center falseEditRow">
              {this.state.addBtnState ? (
                <button
                  className="btn btn-lg tutorBtn"
                  onClick={this.handlePeerCatDep}
                >
                  Add Department
                </button>
              ) : (
                <button className="btn btn-lg tutorBtn" disabled>
                  Add Department
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  render() {
    return (
      <>
        {this.renderAddPeerCat()}
        {this.renderPeerCat()}
      </>
    );
  }
}
export default AdminPeerCat;