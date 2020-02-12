import PouchDB from "pouchdb";
import { observable } from "mobx";

export let TutorStore = observable({
  Tutor: []
});

TutorStore.Fetch = () => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );

  let id = "nicklandiam";
  db.get(id).then(function(doc) {
    //console.log(doc);
    TutorStore.Tutor = doc;
    console.log(TutorStore.Tutor);
  });
};

TutorStore.GetQueue = programID => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );
  programID = "Creative Technologies";

  let currentQ = [];

  db.get(programID).then(function(doc) {
    doc.activeQ.forEach(e => {
      currentQ.push(e);
    });
  });

  return currentQ;
};

export default TutorStore;
