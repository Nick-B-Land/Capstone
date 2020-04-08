import React, { Component } from "react";
import PouchDB from "pouchdb";
import "../css/adminTutor.css";
import AdminTutorRender from "./adminTutorRender";

// ----- TODO -----
// Add Tutor btn to add a new tutor to db
// Will need to rerender so new tutor shows up without refresh
//

class AdminTutors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTutors: [],
      passInput: "",
      progInput: "",
      phoneInput: "",
      emailInput: "",
      addressInput: "",
      cityInput: "",
      provinceInput: "",
      roleInput: "",
      fNameInput: "",
      lNameInput: "",
      showAdd: false,
      canAddNewTutor: true,
      addbtn: false
    };
  }

  componentDidMount = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    tDB
      .changes({ since: "now", live: true, include_docs: true })
      .on("change", () => {
        this.fetchTutors();
        console.log("TUTOR DB UPDATED");
      });

    await this.fetchTutors();
    console.log(this.state.currentTutors);
  };

  handleUpdates = async () => {
    await this.fetchTutors;
    this.renderTutors();
  };

  handleAddVisibility = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  fetchTutors = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    let tPromise = new Promise((resolve, reject) => {
      tDB
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(docs) {
          resolve(docs.rows);
        })
        .catch(function(err) {
          reject(console.log(err));
        });
    });

    let tResult = await tPromise;
    await this.setState({ currentTutors: tResult });
  };

  isOdd = n => {
    if (n % 2 === 0) return true;
    else return false;
  };

  renderTutors = () => {
    let filteredTutors = this.state.currentTutors.filter(
      e => e.doc.role !== "Admin"
    );
    let counter = 0;

    return filteredTutors.map(e => (
      <AdminTutorRender
        rowType={this.isOdd(counter++)}
        id={e.doc._id}
        pass={e.doc.password}
        programID={e.doc.programID}
        phone={e.doc.phoneNumber}
        email={e.doc.email}
        address={e.doc.streetAddress}
        city={e.doc.city}
        province={e.doc.province}
        role={e.doc.role}
      />
    ));
  };

  handlePassInput = e => {
    this.setState({ passInput: e.target.value });
  };

  handleProgInput = e => {
    this.setState({ progInput: e.target.value });
  };

  handlePhoneInput = e => {
    this.setState({ phoneInput: e.target.value });
  };

  handleEmailInput = e => {
    this.setState({ emailInput: e.target.value });
  };

  handleAddressInput = e => {
    this.setState({ addressInput: e.target.value });
  };

  handleCityInput = e => {
    this.setState({ cityInput: e.target.value });
  };

  handleProvinceInput = e => {
    this.setState({ provinceInput: e.target.value });
  };

  handleRoleInput = e => {
    this.setState({ roleInput: e.target.value });
  };

  handleAddTutor = () => {
    this.setState({ canAddNewTutor: true });
  };
  handleFNameInput = e => {
    this.setState({ fNameInput: e.target.value });
  };
  handleLNameInput = e => {
    this.setState({ lNameInput: e.target.value });
  };

  handleTutor = () => {
    let db = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    let tutorObj = {
      _id: this.state.emailInput,
      password: this.state.passInput,
      firstName: this.state.fNameInput,
      lastName: this.state.lNameInput,
      programID: this.state.progInput,
      phoneNumber: this.state.phoneInput,
      email: this.state.emailInput,
      streetAddress: this.state.addressInput,
      city: this.state.cityInput,
      province: this.state.provinceInput,
      role: this.state.roleInput,
      isLoggedIn: false
    };

    db.put(tutorObj).catch(function(err) {
      console.log(err);
    });

    this.handleAddVisibility();
  };

  renderAddTutor = () => {
    return (
      <>
        <div>
          <div className="col">
            <div className="row d-flex justify-content-around">
              <button
                className="btn btn-lg tutorBtn"
                onClick={this.handleAddVisibility}
              >
                Add New Tutor
              </button>
            </div>
          </div>
        </div>
        <div className={this.state.showAdd ? "showEdit" : "hideEdit"}>
          <div className="container">
            <div className="row d-flex falseEditRow">
              <div className="col-12 text-center">
                <h3>New Tutor</h3>
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>First Name</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleFNameInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Last Name</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleLNameInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Password</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handlePassInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Program ID</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleProgInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Phone Number</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handlePhoneInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Email</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleEmailInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Street Address</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleAddressInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>City</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleCityInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Province</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleProvinceInput}
                />
              </div>
            </div>
            <div className="row d-flex falseEditRow">
              <div className="col-6 text-center">
                <h4>Role</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  onInput={this.handleRoleInput}
                />
              </div>
            </div>
            <div className="row d-flex justify-content-center falseEditRow">
              {this.state.canAddNewTutor ? (
                <button
                  className="btn btn-lg tutorBtn"
                  onClick={this.handleTutor}
                >
                  Add Tutor
                </button>
              ) : (
                <button className="btn btn-lg tutorBtn" disabled>
                  Add Tutor
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
        {this.renderAddTutor()}
        {this.renderTutors()}
      </>
    );
  }
}

export default AdminTutors;
