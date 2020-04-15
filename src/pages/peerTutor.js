import React, { Component } from "react";
import PouchDB from "pouchdb";
import { Link } from "react-router-dom";
import PeerCategoryRender from "../components/peerCategoryRender";
import CategoryRender from "../components/categoryRender";

class TutorOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      peerCategories: null,
      scene: "default"
    };
  }

  componentDidMount = async () => {
    this.fetchPeerTutoring();
  };

  generateOptions = () => {
    let array = this.state.peerCategories;

    if (array !== null) {
      return array.map((e) => <option value={e.id}>{e.id}</option>);
    }
  };

  fetchPeerTutoring = async () => {
    let ptDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/peer_categories"
    );

    let ptPromise = new Promise((resolve, reject) => {
      ptDB
        .allDocs({
          include_docs: true,
          attachments: true,
        })
        .then(function (docs) {
          resolve(docs.rows);
        })
        .catch(function (err) {
          reject(console.log(err));
        });
    });

    let ptResult = await ptPromise;
    await this.setState({ peerCategories: ptResult });
    console.log(this.state.peerCategories);
  };

  render() {
    return (
      <div className="container">
        <h1 className="validateLead">Please Select A Peer Tutor Catergory</h1>
        <div className="validateContainer">
          <select>{this.generateOptions()}</select>
          <div>
            <p></p>
          </div>
          <div className="form-group">
            <button className="btn btn-lg btn-dark homeBtn">Add Student</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorOptions;