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
  var qDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  db.get(id)
    .then(function(doc) {
      doc.isLoggedIn = true;
      TutorStore.Tutor = doc;
      return db.put(doc);
    })
    .then(() => {
      qDB.get(TutorStore.Tutor.programID).then(function(doc) {
        TutorStore.Queue = doc.activeQ;
      });
    });
};

TutorStore.Clear = () => {
  TutorStore.Tutor = {};
  TutorStore.Queue = [];

  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );

  db.get(sessionStorage.getItem("Tutor")).then(function(doc) {
    doc.isLoggedIn = false;
    return db.put(doc);
  });

  sessionStorage.removeItem("Tutor");

  console.log("I was clicked");
};

TutorStore.GetQueue = programID => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );
  db.get(programID).then(function(doc) {
    TutorStore.Queue = doc.activeQ;
  });
};

//time formatting probably needs some work
TutorStore.StartAppointment = aID => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  let date = new Date();
  let time = date.toLocaleTimeString();
  db.get(TutorStore.Tutor.programID).then(function(doc) {
    doc.activeQ.forEach(e => {
      if (aID === e.id) {
        e.appointmentStart = time;
        console.log("Appointment started at " + time);
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
  let studDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
  );
  let date = new Date();
  let time = date.toLocaleTimeString();
  let completedAppointment = {};
  let studentID = 0;

  //get the appropriate program database
  //update the end time, copy the activeQ object for posting to historydb
  //add some properties to that object, filter the current q from program db
  //post history object and update student total appointments
  db.get(TutorStore.Tutor.programID)
    .then(function(doc) {
      doc.activeQ.forEach(e => {
        if (aID === e.id) {
          e.appointmentEnd = time;
          studentID = e.studentID;
          console.log("Appointment ended at " + time);
          completedAppointment = e;
          completedAppointment._id = completedAppointment.id.toString();
          completedAppointment.tutor = TutorStore.Tutor._id;
          completedAppointment.noShow = false;
          completedAppointment.cancelled = false;
          doc.currentQ = doc.currentQ - 1;
          doc.ETA = doc.ETA - doc.qLength;
          doc.activeQ = doc.activeQ.filter(e => e.id !== aID);
          //TutorStore.Tutor.Queue = doc.activeQ;
          TutorStore.Fetch(TutorStore.Tutor._id);
        }
      });
      return db.put(doc);
    })
    .then(function() {
      histDB.put(completedAppointment);
    })
    .then(function() {
      return studDB.get(studentID);
    })
    .then(function(doc) {
      doc.totalAppointments = doc.totalAppointments + 1;
      return studDB.put(doc);
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
