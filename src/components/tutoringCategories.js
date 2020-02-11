import React, { Component } from "react";
import { Link } from "react-router-dom";
import CategoryRender from "./categoryRender";
import { observer } from "mobx-react";

const tutoringCategories = observer(
  class TutoringCategories extends Component {
    componentDidMount = () => {
      //console.log(this.props.catStore.Categories[0].doc._id);
      //console.log(this.props.catStore.Categories);
    };

    renderCategories = () => {
      let Cats = this.props.catStore.Categories;

      // Cats.forEach(e=> {
      //   return
      // })

      return Cats.map(e => (
        <section key={e.doc._id}>
          {console.log(e.doc._id)}
          <CategoryRender
            currentQ={e.doc.CurrentQ}
            ETA={e.doc.ETA}
            name={e.doc._id}
            catStore={this.props.catStore}
          />
        </section>
      ));
    };

    render() {
      return (
        <div className="container">
          <div className="categoryLead">
            <h1>Tutoring Categories</h1>
          </div>
          <div className="row row-cols-4">{this.renderCategories()}</div>
        </div>
      );
    }
  }
);

export default tutoringCategories;
