import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

const categoryRender = observer(
  class CategoryRender extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentQ: this.props.currentQ,
        ETA: this.props.ETA
      };
    }
    render() {
      return (
        <div className="col">
          <div className="card">
            <div className="card-header">Writing</div>
            <div className="card-body">
              <span>
                <h5>
                  Queue : <b>{this.props.currentQ}</b>
                </h5>
              </span>
              <span>
                <h6>
                  ETA : <b>{this.props.ETA}</b>
                </h6>
              </span>
              <Link to="/waitlisted">
                <button className="btn btn-dark ">Waitlist</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
);

export default categoryRender;
