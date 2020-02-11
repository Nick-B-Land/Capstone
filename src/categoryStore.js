import { observable } from "mobx";
import PouchDB from "pouchdb";

export let CatStore = observable({
  Categories: []
});

CatStore.Fetch = () => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/tutoring"
  );

  let loaded = false;

  db.allDocs({
    include_docs: true,
    attachments: true
  })
    .then(function(result) {
      CatStore.Categories = result.rows;
      loaded = true;
      //console.log(result.rows);
      //   console.log(CatStore.Categories);
      console.log(CatStore.Categories[3].doc._id);
    })
    .catch(function(err) {
      console.log(err);
    });

  if (loaded) return true;
};

CatStore.Waitlist = id => {
  var db = new PouchDB(
    "https://3ea95abe-b57e-4081-872d-64f21675ceae-bluemix.cloudant.com/tutoring"
  );

  CatStore.Categories.forEach(e => {
    if (id === e.doc._id) {
      let l = e.doc.CurrentQ;
      let est = e.doc.ETA;
      db.get(e.doc._id)
        .then(function(doc) {
          doc.CurrentQ = l + 1;
          doc.ETA = est + 15;
          return db.put(doc);
        })
        .then(function() {
          return db.get(e.doc._id);
        })
        .then(function(doc) {
          e.doc.CurrentQ = doc.CurrentQ;
          e.doc.ETA = doc.ETA;
        });
    }
  });
};

export default CatStore;
