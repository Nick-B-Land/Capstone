import React, { Component } from "react";
import PouchDB from "pouchdb";

class TutorLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorEmail: "",
      tutorPassword: "",
      emailValidated: true,
    };
  }

  componentDidMount = () => {
    let t = sessionStorage.getItem("Tutor");
    let a = sessionStorage.getItem("Admin");
    if (t) this.props.history.push("/tutordashboard");
    else if (a) this.props.history.push("/adminhome");
  };

  handleEmail = (e) => {
    this.setState({ tutorEmail: e.target.value });
  };

  //some basic email regex
  //still need to work out password validation
  //we should probably use JWT's
  validateEmail = () => {
    //let re = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}");
    let re = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    if (re.test(this.state.tutorEmail) === false) {
      this.setState({ emailValidated: false });
    } else this.setState({ emailValidated: true });
  };

  handlePass = (e) => {
    this.setState({ tutorPassword: e.target.value });
  };

  handleLogin = () => {
    let db = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );
    //lose context of this inside api call for some reason
    let x = this;
    let tPass = this.state.tutorPassword;
    if (this.state.emailValidated && this.state.tutorEmail !== "") {
      let s = this.state.tutorEmail.search("@");
      let tID = this.state.tutorEmail.substr(0, s);
      db.get(tID).then(function (doc) {
        if (tPass === doc.password) {
          if (doc.role === "Tutor") {
            sessionStorage.setItem("Tutor", tID);
            x.props.history.push("/tutordashboard");
          } else if (doc.role === "Admin") {
            sessionStorage.setItem("Admin", tID);
            x.props.history.push("/adminhome");
          } else if (doc.role === "Appointment") {
            sessionStorage.setItem("Appointment", tID);
            x.props.history.push("/appointmentdashboard");
          }
        } else alert("Invalid password");
      });
    } else alert("Please enter a valid email");
  };

  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Enter Tutor Information</h1>
        <div className="validateContainer">
          <div className="validateForm">
            <div className="form-group">
              <label htmlFor="tutorEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="tutorEmail"
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
              <label htmlFor="validPass">Password</label>
              <input
                className="form-control"
                id="validPass"
                type="password"
                onInput={this.handlePass}
              />
            </div>
            <div className="form-group validateBtn">
              <button
                className="btn btn-lg btn-dark homeBtn"
                onClick={this.handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorLogin;
