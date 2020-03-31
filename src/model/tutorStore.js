import PouchDB from "pouchdb";
import { observable, toJS } from "mobx";

export let TutorStore = observable({
  Tutor: {},
  Queue: [],
  QLength: null
});

TutorStore.FetchTutor = async id => {
  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );
  let qDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  return db
    .get(id)
    .then(function(doc) {
      return doc;
    })
    .catch(function(err) {
      console.log(err);
    });

  // db.get(id)
  //   .then(function(doc) {
  //     if (!doc.isLoggedIn) {
  //       doc.isLoggedIn = true;
  //       db.put(doc);
  //     }
  //     //TutorStore.Tutor = doc;
  //     return doc;
  //   })
  //   .then(function(doc) {
  //     TutorStore.Tutor = doc;
  //   })
  //   .then(() => {
  //     qDB
  //       .get(TutorStore.Tutor.programID)
  //       .then(function(doc) {
  //         // TutorStore.Queue = doc.activeQ;
  //         // TutorStore.QLength = doc.qLength;
  //         return doc;
  //       })
  //       .then(function(doc) {
  //         TutorStore.Queue = doc.activeQ;
  //         TutorStore.QLength = doc.qLength;
  //       });
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });

  // const tID = id;
  // let tutorPromise = new Promise((resolve, reject) => {
  //   db.get(tID)
  //     .then(function(doc) {
  //       doc.isLoggedIn = true;
  //       //TutorStore.Tutor = doc;
  //       db.put(doc);
  //       resolve(doc);
  //     })
  //     .catch(function(err) {
  //       reject(err);
  //     });
  // });

  // let qPromise = new Promise((resolve, reject) => {
  //   qDB
  //     .get(TutorStore.Tutor.programID)
  //     .then(function(doc) {
  //       //TutorStore.Queue = doc.activeQ;
  //       TutorStore.QLength = doc.qLength;
  //       resolve(doc);
  //     })
  //     .catch(function(err) {
  //       reject(err);
  //     });
  // });

  // let t = await tutorPromise;
  // console.log(t);
  // TutorStore.Tutor = t;
  // console.log(TutorStore.Tutor._id);
  // let q = await qPromise;
  // console.log(q);
  // TutorStore.Queue = q.activeQ;
  // TutorStore.QLength = q.qLength;
};

TutorStore.Fetch = id => {
  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );
  let qDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  db.get(id)
    .then(function(doc) {
      if (!doc.isLoggedIn) {
        doc.isLoggedIn = true;
        db.put(doc);
      }
      //TutorStore.Tutor = doc;
      return doc;
    })
    .then(function(doc) {
      TutorStore.Tutor = doc;
    })
    .then(() => {
      qDB
        .get(TutorStore.Tutor.programID)
        .then(function(doc) {
          // TutorStore.Queue = doc.activeQ;
          // TutorStore.QLength = doc.qLength;
          return doc;
        })
        .then(function(doc) {
          TutorStore.Queue = doc.activeQ;
          TutorStore.QLength = doc.qLength;
        });
    })
    .catch(function(err) {
      console.log(err);
    });
};

TutorStore.FetchQueue = () => {
  let qDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  return qDB
    .get(TutorStore.Tutor.programID)
    .then(function(doc) {
      console.log(doc);
      return doc;
    })
    .catch(function(err) {
      console.log(err);
    });
};

TutorStore.Clear = () => {
  TutorStore.Tutor = {};
  TutorStore.Queue = [];

  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );

  db.get(sessionStorage.getItem("Tutor"))
    .then(function(doc) {
      doc.isLoggedIn = false;
      return db.put(doc);
    })
    .catch(function(err) {
      console.log(err);
    });

  sessionStorage.removeItem("Tutor");

  console.log("I was clicked");
};

TutorStore.GetQueue = programID => {
  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );
  db.get(programID)
    .then(function(doc) {
      TutorStore.Queue = doc.activeQ;
    })
    .catch(function(err) {
      console.log(err);
    });
};

//time formatting probably needs some work
TutorStore.StartAppointment = aID => {
  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );

  let date = new Date();
  let time = date.toLocaleTimeString();

  db.get(TutorStore.Tutor._id)
    .then(function(doc) {
      doc.activeAppointment.appointmentStart = time;
      return db.put(doc);
    })
    .then(() => {
      return db.get(TutorStore.Tutor._id);
    })
    .catch(function(err) {
      console.log(err);
    });
  // db.get(TutorStore.Tutor.programID)
  //   .then(function(doc) {
  //     doc.activeQ.forEach(e => {
  //       console.log(aID + " " + e.id);
  //       if (aID === e.id) {
  //         e.appointmentStart = time;
  //         console.log("Appointment started at " + time);
  //       }
  //     });
  //     return db.put(doc);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
};

TutorStore.EndAppointment = () => {
  let tDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );
  let db = new PouchDB(
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
  let studentID = 0;

  let completedAppointment = {};

  console.log(completedAppointment);

  tDB
    .get(TutorStore.Tutor._id)
    .then(function(doc) {
      completedAppointment = doc.activeAppointment;
      studentID = doc.activeAppointment.studentID;
      completedAppointment.appointmentEnd = time;
      completedAppointment._id = completedAppointment.id.toString();
      completedAppointment.tutor = TutorStore.Tutor._id;
      completedAppointment.noShow = false;
      completedAppointment.cancelled = false;

      doc.activeAppointment = {};
      return tDB.put(doc);
    })
    .then(() => {
      return tDB.get(TutorStore.Tutor._id);
    })
    .then(() => {
      histDB.put(completedAppointment);
    })
    .then(() => {
      return db.get(TutorStore.Tutor.programID);
    })
    .then(function(doc) {
      doc.currentQ = doc.currentQ - 1;
      doc.ETA = doc.ETA - doc.qLength;
      return db.put(doc);
    })
    .then(() => {
      return db.get(TutorStore.Tutor.programID);
    })
    .then(() => {
      return studDB.get(studentID);
    })
    .then(function(doc) {
      doc.totalAppointments = doc.totalAppointments + 1;
      return studDB.put(doc);
    })
    .then(() => {
      return studDB.get(studentID);
    })
    .catch(function(err) {
      console.log(err);
    });

  TutorStore.Tutor.activeAppointment = {};
  //get the appropriate program database
  //update the end time, copy the activeQ object for posting to historydb
  //add some properties to that object, filter the current q from program db
  //post history object and update student total appointments
  // db.get(TutorStore.Tutor.programID)
  //   .then(function(doc) {
  //     doc.activeQ.forEach(e => {
  //       if (aID === e.id) {
  //         e.appointmentEnd = time;
  //         studentID = e.studentID;
  //         console.log("Appointment ended at " + time);
  //         completedAppointment = e;
  //         completedAppointment._id = completedAppointment.id.toString();
  //         completedAppointment.tutor = TutorStore.Tutor._id;
  //         completedAppointment.noShow = false;
  //         completedAppointment.cancelled = false;
  //         doc.currentQ = doc.currentQ - 1;
  //         doc.ETA = doc.ETA - doc.qLength;
  //         doc.activeQ = doc.activeQ.filter(e => e.id !== aID);
  //         //TutorStore.Tutor.Queue = doc.activeQ;
  //         TutorStore.Fetch(TutorStore.Tutor._id);
  //       }
  //     });
  //     return db.put(doc);
  //   })
  //   .then(function() {
  //     histDB.put(completedAppointment);
  //   })
  //   .then(function() {
  //     return studDB.get(studentID);
  //   })
  //   .then(function(doc) {
  //     doc.totalAppointments = doc.totalAppointments + 1;
  //     return studDB.put(doc);
  //   })
  //   .catch(function(err) {
  //     console.log(err);
  //   });
};

// TutorStore.getTutorActiveAppointmentID = () => {
//   console.log(TutorStore.Tutor.programID);
//   return TutorStore.Tutor._id;
// };

TutorStore.ExtendAppointment = inc => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  db.get(TutorStore.Tutor.programID)
    .then(function(doc) {
      doc.ETA += inc;
      return db.put(doc);
    })
    .catch(function(err) {
      console.log(err);
    });
};

TutorStore.NoShow = () => {
  let tDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
  );
  let db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );
  let histDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/history"
  );
  let studDB = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/students"
  );

  let studentID = 0;
  let completedAppointment = {};

  console.log(completedAppointment);

  tDB
    .get(TutorStore.Tutor._id)
    .then(function(doc) {
      completedAppointment = doc.activeAppointment;
      studentID = doc.activeAppointment.studentID;
      completedAppointment._id = completedAppointment.id.toString();
      completedAppointment.tutor = TutorStore.Tutor._id;
      completedAppointment.noShow = true;
      completedAppointment.cancelled = false;
      doc.activeAppointment = {};
      return tDB.put(doc);
    })
    .then(() => {
      return tDB.get(TutorStore.Tutor._id);
    })
    .then(() => {
      histDB.put(completedAppointment);
    })
    .then(() => {
      return db.get(TutorStore.Tutor.programID);
    })
    .then(function(doc) {
      doc.currentQ = doc.currentQ - 1;
      doc.ETA = doc.ETA - doc.qLength;
      return db.put(doc);
    })
    .then(() => {
      return db.get(TutorStore.Tutor.programID);
    })
    .then(() => {
      return studDB.get(studentID);
    })
    .then(function(doc) {
      doc.totalAppointments = doc.totalAppointments + 1;
      doc.noShows = doc.noShows + 1;
      return studDB.put(doc);
    })
    .then(() => {
      return studDB.get(studentID);
    })
    .catch(function(err) {
      console.log(err);
    });

  TutorStore.Tutor.activeAppointment = {};
};

export default TutorStore;
