import React, { Component } from "react";
import CategoryRender from "../components/categoryRender";
import PouchDB from "pouchdb";
import { observer } from "mobx-react";
import PeerCategoryRender from "../components/peerCategoryRender";

const tutoringCategories = observer(
  class TutoringCategories extends Component {
    constructor(props) {
      super(props);
      this.state = { peerCategories: [] };
    }

    componentDidMount = async () => {
      this.props.catStore.Fetch();
      await this.fetchPeerTutoring();
      console.log(this.state.peerCategories);
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
    };

    renderCategories = () => {
      let Cats = this.props.catStore.Categories;

      return Cats.map((e) => (
        <section key={e.doc._id}>
          <CategoryRender
            currentQ={e.doc.currentQ}
            desc={e.doc.desc}
            ETA={e.doc.ETA}
            name={e.doc._id}
            catStore={this.props.catStore}
          />
        </section>
      ));
    };

    renderPeerCategories = () => {
      let pc = this.state.peerCategories;

      return pc.map((e) => (
        <section key={e.doc._id}>
          <PeerCategoryRender
            department={e.doc.department}
            mondayTimes={e.doc.mondayTimes}
            tuesdayTimes={e.doc.tuesdayTimes}
            wednesdayTimes={e.doc.wednesdayTimes}
            thursdayTimes={e.doc.thursdayTimes}
            fridayTimes={e.doc.fridayTimes}
          />
        </section>
      ));
    };

    render() {
      return (
        <div className="container">
          <div className="row">
            <div className="col categoryLead">
              <h1>Peer Tutoring Categories</h1>
              <p>
                Find information on when and where a verified peer tutor will be
                available
              </p>
            </div>
          </div>
          <div className="row row-cols-4">{this.renderPeerCategories()}</div>
          <div className="row">
            <div className="col categoryLead">
              <h1>Tutoring Categories</h1>
              <p>
                Queue up for one on one tutoring with a member of the LSS staff
              </p>
            </div>
          </div>
          <div className="row row-cols-4">{this.renderCategories()}</div>
          <div className="row">
            <div className="col categoryLead">
              <h1>Tutoring Appointments</h1>
              <p>Book an appointment with a LSS learning coach</p>
            </div>
          </div>
          <div className="row row-cols-4">appointment tutors here</div>
        </div>
      );
    }
  }
);

export default tutoringCategories;
