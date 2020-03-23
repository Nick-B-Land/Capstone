import React, { Component } from "react";
import { observer } from "mobx-react";
import PouchDB from "pouchdb";

//
// QNote -
// Renders each note object attached to the student database (in note array)
//
// Props -
// sID: Student ID to obtain notes for
//

const qNote = observer(
  class QNote extends Component {
    _isMounted = false;
    constructor(props) {
      super(props);
      this.state = { visibility: false, currentQNotes: [] };
    }

    componentDidMount = () => {
      this._isMounted = true;
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
      );
      console.log(this._isMounted);
      if (this._isMounted) this.fetchQNotes();
      db.changes({ since: "now", live: true, include_docs: true }).on(
        "change",
        () => {
          if (this._isMounted) this.fetchQNotes();
        }
      );
    };

    componentWillUnmount = () => {
      this._isMounted = false;
    };

    fetchQNotes = async () => {
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
      );
      let x = this;
      if (this.props.sID) {
        let p = new Promise((resolve, reject) => {
          db.get(this.props.sID)
            .then(function(doc) {
              //x.setState({ currentQNotes: doc.notes });
              resolve(doc.notes);
            })
            .catch(function(err) {
              //console.log(err);
              reject(err);
            });
        });
        let s = await p;
        this.setState({ currentQNotes: s });
      }
    };

    renderQNotes = () => {
      if (this.state.currentQNotes.length === 0) {
        return <h3>No notes added</h3>;
      } else {
        return this.state.currentQNotes.map(e => (
          <div key={Math.random()}>
            <h4>Date: {e.date}</h4>
            <h4>Tutor: {e.tutor}</h4>
            <p>Description: {e.description}</p>
          </div>
        ));
      }
    };

    handleNoteClick = () => {
      this.setState({ visibility: !this.state.visibility });
    };

    render() {
      return (
        <div>
          <button onClick={this.handleNoteClick} className="btn btn-dark">
            {this.state.visibility ? "Hide Notes" : "Show Notes"}
          </button>
          <div className={this.state.visibility ? "showQNotes" : "hideQNotes"}>
            <br />
            {this.renderQNotes()}
          </div>
        </div>
      );
    }
  }
);

export default qNote;
