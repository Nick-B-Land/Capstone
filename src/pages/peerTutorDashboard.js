import React, { Component } from "react";
import PouchDB from "pouchdb";
import PeerCategoryRender from "../components/peerCategoryRender";
import { observe } from "mobx";

const peerTutorDashboard = observe(
    class peerTutorDashboard extends Component {
        constructor(props) {
            super(props);
            this.state = {}
        }

        componentDidMount = async () => {
            let tID = sessionStorage.getItem("PeerTutor");
            let response = await this.props.tutorStore.FetchTutor(tID);
            this.props.tutorStore.Tutor = response;
            await this.setState({ ts: response });
            this.props.tutorStore.Tutor = this.state.ts;
            let qResp = await this.props.tutorStore.FetchQueue();
            await this.setState({ q: qResp.activeQ });
            this.props.tutorStore.Queue = this.state.q;
            let qDB = new PouchDB(
              "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
            );
            qDB
              .changes({ since: "now", live: true, include_docs: true })
              .on("change", () => {
                this.props.tutorStore.Fetch(tID);
              });
      
            console.log(this.props.tutorStore.Queue);
          };
        render = () => {
            return (
                <div>
                    <h1>Test</h1>
                </div>
            )
        }
    }
);

export default peerTutorDashboard;