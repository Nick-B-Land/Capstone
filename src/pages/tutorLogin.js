// tutorLogin. js
import React, { Component } from "react";
import PouchDB from "pouchdb";
import { Link } from "react-router-dom";
import "../css/tutorLogin.css";

class TutorLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorEmail: "",
      tutorPassword: "",
      emailValidated: true,
      scene: "default",
    };
  }

  componentDidMount = () => {
    let t = sessionStorage.getItem("Tutor");
    let a = sessionStorage.getItem("Admin");
    if (t) this.props.history.push("/tutordashboard");
    else if (a) this.props.history.push("/adminhome");
  };


  // handleEmail passes the value that the user entered 
  // within the email input and sets it to
  // tutorEmail within the state
  handleEmail = (e) => {
    this.setState({ tutorEmail: e.target.value });
  };

  // some basic email regex
  // still need to work out password validation
  // we should probably use JWT's
  // validateEmail uses regex to check the user input of 
  // email input for all the allowed symbols and letters
  // if the email fails to pass the test
  // it will set tutorEmail within state to false
  // and will also set emailValidated in state to false
  // if the email passes the test it will set 
  // emailValidated to true within state
  validateEmail = () => {
    let re = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    if (re.test(this.state.tutorEmail) === false) {
      this.setState({ emailValidated: false });
    } else this.setState({ emailValidated: true });
  };

  // handlePass is getting passed the value the user inputed
  // into the password input back
  // then it is setting the state of tutorPassword to that value
  handlePass = (e) => {
    this.setState({ tutorPassword: e.target.value });
  };

  // handleLogin creates a new PouchDB String that connects to the database of tutors
  // tPass gets the tutorPassword from the state
  // then we compare the emailValidated from state and making sure it isn't empty
  // if the email is empty or incorrect it will aleart to Please enter a valid email
  // s searches within emailValidated for @
  // then we create a substring with what is left of the @ sign within emailValidated
  // then we search our database of tutors from that email substring
  // once the database finds a doc that matches that email it compares the password within
  // that doc and the tPass to make sure the password is correct
  // if password is not correct it will alreat to Invalid password
  // if it is correct it will then grab the information from the tutor
  // we then check if the user role within the database is either 
  // admin or tutor and pass the information from the database doc to sessionStorage
  // and route the user to the correct page for their role
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


  // handleTutorSelection passes Tutor to the scene within the state
  // if the tutor button is clicked
  handleTutorSelection = () => {
    this.setState({ scene: "Tutor" });
    this.renderScene();
  };

  // renderHome is what renders on the page if Tutor is set to the scene within the state
  // within this render method it will take an email input, password input, and a button click
  // it will pass each of these to the methods that are needed to validate the inputs from the user
  renderHome = () => {
    return (
      <div className="container">
        <div className="row">
          <h1 className="validateLead">Enter Tutor Information</h1>
        </div>
        <div className="row">
          <div className="validateContainer">
            <div className="validateForm">
              <div className="form-group">
                <label htmlFor="tutorEmail">
                  <h2 className="boxHeaders">Email address</h2>
                </label>
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
                <label htmlFor="validPass">
                  <h2 className="boxHeaders">Password</h2>
                </label>
                <input
                  className="form-control"
                  id="validPass"
                  type="password"
                  onInput={this.handlePass}
                />
              </div>
              <div className="form-group validateBtn">
                <button
                  className="btn btn-lg bookBtn"
                  onClick={this.handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // renderOptions is the default render for this page
  // it contains two buttons one that says Tutor & another that says Peer Tutor
  // depending on which button is press it will either change the scene to the Tutor Login 
  // or will pass the user onto the Peer Tutoring Page
  renderOptions = () => {
    return (
      <div className="container">
        <div className="row">
          <h1 className="validateLead">Select Tutor Type</h1>
        </div>
        <div className="row">
          <div className="validateContainer">
            <div className="form-group validateBtn">
              <button
                className="btn btn-lg bookBtn"
                onClick={this.handleTutorSelection}
              >
                Tutor
              </button>
              <div className="form-group validateBtn">
                <Link to="/peertutor">
                  <button className="btn btn-lg bookBtn">Peer Tutor</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  //renderScene is the method used to determine which scene should be render
  // this takes the scene within state and depending on what scene value is it will render
  // to the correct method
  renderScene = () => {
    let scene = this.state.scene;
    if (scene === "default") return this.renderOptions();
    else if (scene === "Tutor") return this.renderHome();
  };


  // render is the method that we use to render the scene that is passed to render scene
  render() {
    return (
      <>
        {this.renderScene()}
        {console.log(this.state.scene)}
      </>
    );
  }
}

export default TutorLogin;
