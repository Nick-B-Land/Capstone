import { observable } from "mobx";
import PouchDB from "pouchdb";

export let CatStore = observable({
  Categories: []
});

CatStore.Fetch = () => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  db.allDocs({
    include_docs: true,
    attachments: true
  })
    .then(function(result) {
      CatStore.Categories = result.rows;
      //console.log(result.rows);
      //   console.log(CatStore.Categories);
      console.log(CatStore.Categories[3].doc._id);
    })
    .catch(function(err) {
      console.log(err);
    });
};

CatStore.Waitlist = id => {
  var db = new PouchDB(
    "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/programs"
  );

  CatStore.Categories.forEach(e => {
    if (id === e.doc._id) {
      let l = e.doc.currentQ;
      let est = e.doc.ETA;
      db.get(e.doc._id)
        .then(function(doc) {
          doc.currentQ = l + 1;
          doc.ETA = est + 15;
          return db.put(doc);
        })
        .then(function() {
          return db.get(e.doc._id);
        })
        .then(function(doc) {
          e.doc.currentQ = doc.currentQ;
          e.doc.ETA = doc.ETA;
        });
    }
  });
};

export default CatStore;
