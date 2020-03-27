import React, { Component } from "react";
import { observer } from "mobx-react";
import "../tutorQList.css";
import PouchDB from "pouchdb";

//
// Props -
//
// setActiveQ: sets the activeQ state in dashboard home to the first appointment in Q
//

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
      if (this.props.tutorStore.Queue.length !== 0)
        console.log(this.props.tutorStore.Queue[0].id);
    };
    isOdd = n => {
      if (n % 2 === 0) return true;
    };

    renderQList = () => {
      // let minusCurrentQ = [];
      // if (this.props.tutorStore.Queue.length !== 0) {
      //   let firstQ = this.props.tutorStore.Queue[0];
      //   this.props.tutorStore.Queue.forEach(e => {
      //     if (e.id < firstQ.id) firstQ = e;
      //   });
      //   minusCurrentQ = this.props.tutorStore.Queue.filter(
      //     e => e.id !== firstQ.id
      //   );
      // }
      let counter = 0;
      if (this.props.tutorStore.Queue.length === 0) {
        return (
          <div className="col emptyQContainer">
            <p className="emptyQPara">No students currently in queue!</p>
          </div>
        );
      } else {
        //let reverseMinusCurrentQ = minusCurrentQ.reverse();
        return this.props.tutorStore.Queue.map(e => (
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

    getActiveQ = async () => {
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
      );

      if (this.props.tutorStore.Queue.length !== 0) {
        this.props.setActiveQ(this.props.tutorStore.Queue[0]);
        let aID = this.props.tutorStore.Queue[0].id;
        let qPromise = new Promise((resolve, reject) => {
          db.get(this.props.tutorStore.Tutor.programID)
            .then(function(doc) {
              doc.activeQ = doc.activeQ.filter(e => e.id !== aID);
              db.put(doc);
              resolve(doc.activeQ);
            })
            .catch(function(err) {
              reject(err);
            });
        });

        let x = await qPromise;
        //this.props.tutorStore.Queue = x;
        console.log(x);
      }
    };

    render() {
      return (
        <div className="container">
          <div>
            <h3 className="appointmentHead">Appointment Queue</h3>
            <button
              type="button"
              className="getNextApp btn btn-default"
              onClick={this.getActiveQ}
            >
              Get Next Appointment
            </button>
            <div className="container-fluid">{this.renderQList()}</div>
          </div>
        </div>
      );
    }
  }
);

export default tutorQList;
