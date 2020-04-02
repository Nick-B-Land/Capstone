import React, { Component } from "react";
import PouchDB from "pouchdb";
import "../css/adminTutor.css";
import AdminTutorRender from "./adminTutorRender";

// ----- TODO -----
// Add Tutor btn to add a new tutor to db
// Will need to rerender so new tutor shows up without refresh
//

class AdminTutors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTutors: []
    };
  }

  componentDidMount = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    tDB
      .changes({ since: "now", live: true, include_docs: true })
      .on("change", () => {
        this.fetchTutors();
        console.log("TUTOR DB UPDATED");
      });

    await this.fetchTutors();
    console.log(this.state.currentTutors);
  };

  handleUpdates = async () => {
    await this.fetchTutors;
    this.renderTutors();
  };

  fetchTutors = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    let tPromise = new Promise((resolve, reject) => {
      tDB
        .allDocs({
          include_docs: true,
          attachments: true
        })
        .then(function(docs) {
          resolve(docs.rows);
        })
        .catch(function(err) {
          reject(console.log(err));
        });
    });

    let tResult = await tPromise;
    await this.setState({ currentTutors: tResult });
  };

  isOdd = n => {
    if (n % 2 === 0) return true;
    else return false;
  };

  renderTutors = () => {
    let filteredTutors = this.state.currentTutors.filter(
      e => e.doc.role !== "Admin"
    );
    let counter = 0;

    return filteredTutors.map(e => (
      <AdminTutorRender
        rowType={this.isOdd(counter++)}
        id={e.doc._id}
        pass={e.doc.password}
        programID={e.doc.programID}
        phone={e.doc.phoneNumber}
        email={e.doc.email}
        address={e.doc.streetAddress}
        city={e.doc.city}
        province={e.doc.province}
        role={e.doc.role}
      />
    ));
  };

  render() {
    return <>{this.renderTutors()}</>;
  }
}

export default AdminTutors;
