import React, { Component } from "react";
import { observer } from "mobx-react";
import PouchDB from "pouchdb";
import PouchdbFind from "pouchdb-find";

const dashboardAnalytics = observer(
  class DashboardAnalytics extends Component {
    constructor(props) {
      super(props);
      PouchDB.plugin(PouchdbFind);
      this.state = { appCount: 0, avgLength: 0 };
    }

    componentDidMount = () => {
      this.getAppointmentNumber();
      this.getAvgAppointmentLength();
    };

    //calculate a tutors average appointment length
    getAvgAppointmentLength = async () => {
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/history"
      );

      let x = this;
      let promise = new Promise((resolve, reject) => {
        db.find({
          selector: {
            tutor: { $eq: x.props.tutorStore.Tutor._id }
          }
        })
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err) {
            console.log(err);
            reject(err);
          });
      });

      let matches = await promise;
      let totalLength = 0;
      let aCount = 0;

      matches.docs.forEach(e => {
        //first colon in time string, used to find position of hours, mins, secs
        let startColon = e.appointmentStart.indexOf(":");
        let endColon = e.appointmentEnd.indexOf(":");

        //handle single or double digit hours (5 or 11)
        let endH;
        if (endColon === 1) {
          endH = parseInt(e.appointmentEnd.charAt(0));
        } else if (endColon === 2) {
          endH = parseInt(e.appointmentEnd.substr(0, 1));
        }

        let endM = parseInt(
          e.appointmentEnd.substr(endColon + 1, endColon + 2)
        );
        let endS = parseInt(
          e.appointmentEnd.substr(endColon + 4, endColon + 5)
        );

        let startH;
        if (startColon === 1) {
          startH = parseInt(e.appointmentStart.charAt(0));
        } else if (startColon === 2) {
          startH = parseInt(e.appointmentStart.substr(0, 1));
        }

        let startM = parseInt(
          e.appointmentStart.substr(startColon + 1, startColon + 2)
        );
        let startS = parseInt(
          e.appointmentStart.substr(startColon + 4, startColon + 5)
        );
        console.log("history ID " + e._id);
        console.log(
          "STARTTIME = hour " + startH + " min " + startM + " sec " + startS
        );
        console.log("ENDTIME = hour " + endH + " min " + endM + " sec " + endS);

        //convert everything to seconds
        let endT = endM * 60 + endS;
        let startT = startM * 60 + startS;

        //hours match, simple math
        if (endH === startH) {
          let timeToAdd = endT - startT;
          console.log("length in minutes " + timeToAdd / 60);
          totalLength += timeToAdd;
          aCount += 1;
        } else {
          // when end hour is greater than start
          //find start minutes to the hour, add to normal end minutes
          // will only handle 1 hour difference, but that should be fine for us
          let diff1 = 60 - startM;
          console.log("start minute difference " + diff1);
          console.log("end min " + endM);
          let timeToAdd = (diff1 + endM) * 60 - startS + endS;
          console.log("length in minutes " + timeToAdd / 60);
          totalLength += timeToAdd;
          aCount += 1;
        }
      });

      //calculate average and convert to minutes
      let avgSecs = totalLength / aCount;
      let avg = avgSecs / 60;
      this.setState({ avgLength: avg.toFixed(2) });
    };

    getAppointmentNumber = async () => {
      // var PouchDB = require("pouchdb");
      // PouchDB.plugin(require("pouchdb-find"));
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/history"
      );

      // -- used to create a index, but index seems to persist so only have to call once? --
      // db.createIndex({
      //   index: {
      //     fields: ["tutor"]
      //   }
      // })
      //   .then(function(result) {
      //     // yo, a result
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   });

      let x = this;
      let promise = new Promise((resolve, reject) => {
        db.find({
          selector: {
            tutor: { $eq: x.props.tutorStore.Tutor._id }
          }
        })
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err) {
            console.log(err);
            reject(err);
          });
      });

      let count = await promise;
      let c = count.docs.length;

      this.setState({ appCount: c });
    };

    render() {
      return (
        <div class="container dashAnal">
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of Completed Appointments</h5>
                  </span>
                  <span>
                    <h6>{this.state.appCount}</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of Students Cancelled</h5>
                  </span>
                  <span>
                    <h6>2</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Average Length of Sessions</h5>
                  </span>
                  <span>
                    <h6>{this.state.avgLength} Minutes</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card">
                <div className="card-body">
                  <span>
                    <h5>Number of No Shows</h5>
                  </span>
                  <span>
                    <h6>1</h6>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default dashboardAnalytics;
