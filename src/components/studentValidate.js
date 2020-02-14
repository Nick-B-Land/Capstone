import React, { Component } from "react";
import { Link } from "react-router-dom";
import PouchDB from "pouchdb";

class StudentValidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      sIDInput: "",
      phoneInput: "",
      programInput: "Writing",
      emailValidated: true,
      sIDValidated: true,
      phoneValidated: true
    };
  }

  handleEmail = e => {
    this.setState({ emailInput: e.target.value });
  };

  validateEmail = () => {
    //let re = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}");
    let re = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    if (re.test(this.state.emailInput) === false) {
      this.setState({ emailValidated: false });
    } else this.setState({ emailValidated: true });
  };

  validateSID = () => {
    let re = new RegExp("^[0-9]{6}$");
    if (re.test(this.state.sIDInput) === false) {
      this.setState({ sIDValidated: false });
    } else this.setState({ sIDValidated: true });
  };

  validatePhone = () => {
    let re = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
    //let re = new RegExp("^[0-9]{6}$");
    if (re.test(this.state.phoneInput) === false) {
      this.setState({ phoneValidated: false });
    } else this.setState({ phoneValidated: true });
  };

  handleSID = e => {
    this.setState({ sIDInput: e.target.value });
  };

  handlePhone = e => {
    this.setState({ phoneInput: e.target.value });
  };

  handleProgram = e => {
    this.setState({ programInput: e.target.value });
    console.log(this.state.programInput);
  };

  //check if student exists in database, if not add and set ID to sessionStorage,
  //if exists, just set sessionStorage
  //works rn but for bad reasons, just errors out if ID exists, need better implementation
  handleStudent = () => {
    var db = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
    );

    sessionStorage.setItem("StudentID", this.state.sIDInput);
    let docExists = false;
    let studentObj = {
      _id: this.state.sIDInput,
      programID: this.state.programInput,
      phone: this.state.phoneInput,
      email: this.state.emailInput
    };

    db.get(this.state.sIDInput).catch(function(err) {
      if (err.status === 404) docExists = true;
    });

    if (!docExists) {
      db.put(studentObj).catch(function(err) {
        console.log(err);
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Enter Student Information</h1>
        <div className="validateContainer">
          <form className="validateForm">
            <div className="form-group">
              <label for="validEmail">BVC Email address</label>
              <input
                type="email"
                className="form-control"
                id="validEmail"
                aria-describedby="emailHelp"
                onInput={this.handleEmail}
                onBlur={this.validateEmail}
              />
              <div
                className={
                  this.state.emailValidated
                    ? "hideEmailVerified card-body"
                    : "showEmailVerified card-body"
                }
              >
                Invalid Email!
              </div>
            </div>
            <div className="form-group">
              <label for="validID">Student ID</label>
              <input
                className="form-control"
                id="validID"
                onInput={this.handleSID}
                onBlur={this.validateSID}
              />
              <div
                className={
                  this.state.sIDValidated
                    ? "hideSIDVerified card-body"
                    : "showSIDVerified card-body"
                }
              >
                Invalid StudentID!
              </div>
            </div>
            <div className="form-group">
              <label for="validPhone">Phone Number</label>
              <input
                className="form-control"
                id="validPhone"
                onInput={this.handlePhone}
                onBlur={this.validatePhone}
              />
              <div
                className={
                  this.state.phoneValidated
                    ? "hidePhoneVerified card-body"
                    : "showPhoneVerified card-body"
                }
              >
                Invalid Phone Number!
              </div>
            </div>
            <div className="form-group text-center">
              <label for="validProgram">Tutoring Need</label>
              <select
                className="form-control text-center"
                id="validProgram"
                onChange={this.handleProgram}
                value={this.state.programInput}
              >
                <option value="Writing">Writing</option>
                <option value="Learning Coach">Learning Coach</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Creative Technologies">
                  Creative Technologies
                </option>
              </select>
            </div>
            <div className="form-group validateBtn">
              <div
                className={
                  this.state.sIDValidated &&
                  this.state.emailValidated &&
                  this.state.phoneValidated &&
                  this.state.emailInput !== "" &&
                  this.state.sIDInput !== "" &&
                  this.state.phoneInput !== ""
                    ? "showCatBtn"
                    : "hideCatBtn"
                }
              >
                <Link to="/categories">
                  <button
                    className="btn btn-lg btn-dark homeBtn"
                    onClick={this.handleStudent}
                  >
                    Get Tutoring
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentValidate;
