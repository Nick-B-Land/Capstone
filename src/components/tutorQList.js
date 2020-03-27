import React, { Component } from "react";
import { observer } from "mobx-react";
import "../tutorQList.css";

const tutorQList = observer(
  class TutorQList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeAppointment: false,
        firstQID: null
      };
    }
    componentDidMount = () => {
      console.log(this.props.tutorStore.Tutor);
    };
    isOdd = n => {
      if (n % 2 === 0) return true;
    };

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
        let reverseMinusCurrentQ = minusCurrentQ.reverse();
        return reverseMinusCurrentQ.map(e => (
          <div className="col" key={e.id}>
            <div
              className={
                this.isOdd(counter++) ? "trueQRow rounded" : "falseQRow rounded"
              }
              key={Math.random()}
            >
              Student Name: {e.studentName} | Student ID: {e.studentID} | Time:{" "}
              {e.timeQueued}
            </div>
          </div>
        ));
      }
    };
    renderScene = () => {
      let scene = this.state.scene;

      if (scene === "home") return this.renderHome();
      else if (scene === "appointmentTimeout")
        return this.renderTimeoutOptions();
      else if (scene === "extendedAppointment") return this.renderExtendScene();
      else if (scene === "analytics") return this.renderAnalyticsScene();
    };
    render() {
      return (
        <div className="container">
          <div>
            <h3 className="appointmentHead">Appointment Queue</h3>
            <button type="button" className="getNextApp btn btn-default">
              Get Next Appointment
            </button>
            <div className="container-fluid">{this.renderQList()}</div>
          </div>
          {this.renderScene()}
        </div>
      );
    }
  }
);

export default tutorQList;
