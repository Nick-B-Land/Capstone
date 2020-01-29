import React, { Component } from "react";
import "../main.css";

class Home extends Component {
  render() {
    return (
      <div id="container-fluid">
        <div className="row">
          <div className="slideShow col"></div>
        </div>
        <div className="row lead">
          <h1 className="homeLead">Learner Success Services</h1>
          <h3 className="homeLead"> Tutoring</h3>
          <p className="homeLead">
            Services to help you thrive in school, in work, and in life.
          </p>
          <p className="homeLead homePara">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="row btnHome">
          <div className="col-6 d-flex justify-content-center">
            <button className="btn btn-lg btn-dark homeBtn">Tutors</button>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <button className="btn btn-lg btn-dark homeBtn">Students</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
