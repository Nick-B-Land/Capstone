import PouchDB from "pouchdb";
import { observable } from "mobx";

export let TutorStore = observable({
  Tutor: {},
  Queue: []
});

TutorStore.Fetch = id => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );

  //let id = "nicklandiam";
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
  //programID = "Creative Technologies";

  let currentQ = [];

  console.log("programID in getQueue " + programID);
  db.get(programID).then(function(doc) {
    TutorStore.Queue = doc.activeQ;
    // doc.activeQ.forEach(e => {
    //   TutorStore.Queue.push(e);
    // });
  });

  //TutorStore.Queue = currentQ;
  console.log(TutorStore.Queue);
};

//time formatting probably needs some work
TutorStore.StartAppointment = aID => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  let date = new Date();
  let hours = "";
  let minutes = "";
  if (date.getHours() > 12) hours = date.getHours() - 12;
  else hours = date.getHours();
  if (date.getMinutes() === 0) minutes = "00";
  else if (date.getMinutes() < 10) minutes = 0 + date.getMinutes();
  else minutes = date.getMinutes();

  let time = hours + ":" + minutes;
  db.get(TutorStore.Tutor.programID).then(function(doc) {
    doc.activeQ.forEach(e => {
      console.log("I WAS FIRED");
      console.log(aID);
      if (aID === e.id) {
        e.appointmentStart = time;
      }
    });
    return db.put(doc);
  });
};

TutorStore.EndAppointment = aID => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );
  let histDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/history"
  );

  console.log(aID);

  let date = new Date();
  let hours = "";
  let minutes = "";
  if (date.getHours() > 12) hours = date.getHours() - 12;
  else hours = date.getHours();
  if (date.getMinutes() === 0) minutes = "00";
  else if (date.getMinutes() < 10) minutes = 0 + date.getMinutes();
  else minutes = date.getMinutes();

  let completedAppointment = {};

  let time = hours + ":" + minutes;

  //this shit is a little spaghetti
  //needs to be refactored?
  //or maybe combined a bit more
  db.get(TutorStore.Tutor.programID)
    .then(function(doc) {
      doc.activeQ.forEach(e => {
        if (aID === e.id) {
          e.appointmentEnd = time;
          completedAppointment = e;
        }
      });
      return db.put(doc);
    })
    .then(function() {
      return db.get(TutorStore.Tutor.programID);
    })
    .then(function(doc) {
      doc.currentQ = doc.currentQ - 1;
      doc.ETA = doc.ETA - doc.qLength;
      doc.activeQ = doc.activeQ.filter(e => e.id !== aID);
      return db.put(doc);
    })
    .then(function() {
      //using a random id via the post method, should probably implement our own
      //for easier querying/indexing
      histDB.post(completedAppointment);
    });
};

TutorStore.ExtendAppointment = inc => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  db.get(TutorStore.Tutor.programID).then(function(doc) {
    doc.ETA += inc;
    return db.put(doc);
  });
};

export default TutorStore;
