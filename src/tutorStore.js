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
    console.log(TutorStore.Tutor.email);
  });
};

export default TutorStore;
