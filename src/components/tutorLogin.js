import React, { Component } from "react";
import { Link } from "react-router-dom";

class TutorLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorEmail: "",
      tutorPassword: "",
      emailValidated: true
    };
  }

  handleEmail = e => {
    this.setState({ tutorEmail: e.target.value });
  };

  validateEmail = () => {
    //let re = new RegExp("[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}");
    let re = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    if (re.test(this.state.tutorEmail) === false) {
      this.setState({ emailValidated: false });
    } else this.setState({ emailValidated: true });
  };

  handlePass = e => {
    this.setState({ tutorPassword: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Enter Tutor Information</h1>
        <div className="validateContainer">
          <form className="validateForm">
            <div className="form-group">
              <label for="tutorEmail">Email address</label>
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
              <label for="validPass">Password</label>
              <input
                className="form-control"
                id="validPass"
                type="password"
                onInput={this.handlePass}
              />
            </div>
            <div className="form-group validateBtn">
              <Link to="/tutordashboard">
                <button className="btn btn-lg btn-dark homeBtn">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TutorLogin;
