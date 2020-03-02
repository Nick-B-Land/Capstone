import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PouchDB from "pouchdb";
import HistoryRender from "../components/historyRender";

const adminHome = observer(
  class AdminHome extends Component {
    state = {
      history: []
    };

    componentDidMount = () => {
      let db = new PouchDB(
        "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/history"
      );

      let x = this;
      db.allDocs({
        include_docs: true,
        attachments: true
      })
        .then(function(result) {
          x.setState({ history: result.rows });
          console.log(x.state.history);
        })
        .catch(function(err) {
          console.log(err);
        });
    };

    renderHistory = () => {
      return this.state.history.map(e => (
        <section key={this.props.id}>
          <HistoryRender
            id={e.doc.id}
            sID={e.doc.studentID}
            pID={e.doc.programID}
            date={e.doc.date}
            timeQD={e.doc.timeQueued}
            aStart={e.doc.appointmentStart}
            aEnd={e.doc.appointmentEnd}
            tutor={e.doc.tutor}
          />
        </section>
      ));
    };

    render() {
      return (
        <div class="wrapper">
          <nav id="sidebar">
            <div class="sidebar-header">
              <h3>Admin Dashboard</h3>
            </div>
            <ul class="list-unstyled components">
              <li class="active">
                <ul class="collapse list-unstyled" id="pageSubmenu"></ul>
              </li>
              <Link to="/adminhome">
                <li>Home</li>
              </Link>
            </ul>
          </nav>
          <div className="container">
            <div className="row">{this.renderHistory()}</div>
          </div>
        </div>
      );
    }
  }
);

export default adminHome;
