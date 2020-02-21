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
      await this.props.tutorStore.Fetch();
      console.log(this.props.tutorStore.Tutor);
      let y = this.props.tutorStore.Tutor.programID;
      console.log("programID in CDM " + y);
      await this.props.tutorStore.GetQueue(y);
      //this.getCurrentQ();
    };

    //needs formatting and styling, just to give a idea
    renderQList = () => {
      return this.props.tutorStore.Queue.map(e => (
        <li>
          Student ID: {e.studentID}, Queue'd At: {e.time}{" "}
        </li>
      ));
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
          <div className="col catCard">
            <div className="card">
              <div className="card-header">{firstQ.programID}</div>
              <div className="card-body">
                <span>
                  <h6>
                    Student ID : <b>{firstQ.studentID}</b>
                  </h6>
                </span>
                <span>
                  <button
                    className="btn btn-dark"
                    onClick={this.handleStartingAppointment}
                  >
                    Start Appointment
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={this.handleEndingAppointment}
                  >
                    End Appointment
                  </button>
                  <button className="btn btn-dark">Extend</button>
                </span>
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
            <div className="row">
              <ul>{this.renderQList()}</ul>
            </div>
            <div className="row">{this.getCurrentQ()}</div>
          </div>
        </div>
      );
    }
  }
);

export default dashboardHome;
