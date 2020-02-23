import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

const dashboardHome = observer(
  class DashboardHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Queue: [],
        currentQID: 0
      };
    }
    componentDidMount = async () => {
      let tID = sessionStorage.getItem("Tutor");
      await this.props.tutorStore.Fetch(tID);
      console.log(this.props.tutorStore.Tutor);
      let y = this.props.tutorStore.Tutor.programID;
      console.log("programID in CDM " + y);
      await this.props.tutorStore.GetQueue(y);
      //this.getCurrentQ();
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
              Student ID: {e.studentID}
            </div>
          </div>
        ));
      }
    };

    handleStartingAppointment = () => {
      let firstQ = this.props.tutorStore.Queue[0];
      this.props.tutorStore.Queue.forEach(e => {
        // console.log(firstQ.id);
        // console.log(e.id);
        if (e.id < firstQ.id) firstQ = e;
      });
      this.props.tutorStore.StartAppointment(firstQ.id);
    };

    //repeating the same code for getting the id
    //it was causing infinite loops for some reason
    //when executed in the render function or component did mount
    //again needs to be refactored
    handleEndingAppointment = () => {
      let firstQ = this.props.tutorStore.Queue[0];
      this.props.tutorStore.Queue.forEach(e => {
        // console.log(firstQ.id);
        // console.log(e.id);
        if (e.id < firstQ.id) firstQ = e;
      });
      this.props.tutorStore.EndAppointment(firstQ.id);
    };

    //shouldn't need 3 functions for this
    extend5 = () => {
      this.props.tutorStore.ExtendAppointment(5);
    };

    extend10 = () => {
      this.props.tutorStore.ExtendAppointment(10);
    };

    extend15 = () => {
      this.props.tutorStore.ExtendAppointment(15);
    };

    //running into errors with asynchronous shit
    //ive set them to await, but shit still fires
    //before the fetch calls are complete sometimes, causing crashes
    //will need some more work and refactoring
    //should be its own component and pass the id as a prop
    getCurrentQ = () => {
      //console.log(this.props.tutorStore.Queue);
      let firstQ = this.props.tutorStore.Queue[0];
      this.props.tutorStore.Queue.forEach(e => {
        // console.log(firstQ.id);
        // console.log(e.id);
        if (e.id < firstQ.id) firstQ = e;
      });
      //if (firstQ) this.setState({ currentQID: firstQ.id });
      if (firstQ) {
        return (
          <div className="col currentQCard">
            <div className="card">
              <div className="card-header">Current Appointment</div>
              <div className="card-body">
                <div className="currentQBody">
                  <span>
                    <h6>
                      Student ID : <b>{firstQ.studentID}</b>
                    </h6>
                  </span>
                  <div className="qCardBtns">
                    <button
                      className="btn btn-dark qStartBtn"
                      onClick={this.handleStartingAppointment}
                    >
                      Start Appointment
                    </button>
                    <button
                      className="btn btn-dark qEndBtn"
                      onClick={this.handleEndingAppointment}
                    >
                      End Appointment
                    </button>
                    {/* 
                    was breaking other buttons for some reason
                    also might not actually need this? could do auto 
                    prompt when timer expires
                    <div class="dropdown qDropBtn">
                      <button
                        className="btn btn-dark dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Extend
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <button
                          className="dropdown-item"
                          onClick={this.extend5}
                        >
                          5 Minutes
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={this.extend10}
                        >
                          10 Minutes
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={this.extend15}
                        >
                          15 Minutes
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="col currentQCard">
            <div className="card">
              <div className="card-header">Current Appointment</div>
              <div className="card-body">
                <div className="currentQBody">
                  <span>
                    <h6>
                      Student ID : <b>Queue is Empty!</b>
                    </h6>
                  </span>
                  <div className="qCardBtns">
                    <button
                      className="btn btn-dark qStartBtn"
                      onClick={this.handleStartingAppointment}
                    >
                      Start Appointment
                    </button>
                    <button
                      className="btn btn-dark qEndBtn"
                      onClick={this.handleEndingAppointment}
                    >
                      End Appointment
                    </button>
                  </div>
                  {/* <div class="dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                    >
                      Extend
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button className="dropdown-item" onClick={this.extend5}>
                        5 Minutes
                      </button>
                      <button className="dropdown-item" onClick={this.extend10}>
                        10 Minutes
                      </button>
                      <button className="dropdown-item" onClick={this.extend15}>
                        15 Minutes
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    };

    //the side nav bar should be its own component and needs to be cleaned up
    render() {
      return (
        <div class="wrapper">
          <nav id="sidebar">
            <div class="sidebar-header">
              <h3>Tutor Dashboard</h3>
            </div>
            <ul class="list-unstyled components">
              <li class="active">
                <ul class="collapse list-unstyled" id="pageSubmenu"></ul>
              </li>
              <Link to="/tutordashboard">
                <li>Home</li>
              </Link>
              <Link to="/tutorprofile">
                <li>Profile</li>
              </Link>
              <Link to="/tutoranalytics">
                <li>Analytics</li>
              </Link>
            </ul>
          </nav>
          <div className="container">
            <div className="row row-cols-1">
              <h3 className="appointmentHead">Appointment Queue</h3>
              {this.renderQList()}
            </div>
            <div className="row">{this.getCurrentQ()}</div>
          </div>
        </div>
      );
    }
  }
);

export default dashboardHome;
