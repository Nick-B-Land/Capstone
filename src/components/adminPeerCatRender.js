import React, { Component } from "react";
import PouchDB from "pouchdb";
import Modal from "react-bootstrap/Modal";

class AdminPeerCatRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showMondayTimes: false,
      showTuesdayTimes: false,
      showWednesdayTimes: false,
      showThursdayTimes: false,
      showFridayTimes: false,
    };
  }
  componentDidMount = async () => {
    console.log(this.props.mondayTimes);
  };

  renderPeerCategories = () => {
    return (
      <>
        <div
          className={
            this.props.rowType
              ? "row d-flex justify-content-center trueRow"
              : "row d-flex justify-content-center falseRow"
          }
        >
          <div className="col">
            <div className="row d-flex justify-content-around">
              <h3>Department: {this.props.department}</h3>
              <button
                className="btn btn-lg tutorBtn"
                //onClick={this.showDeletePopupVisability}
              >
                Delete tutor
              </button>
            </div>

            <div className="row d-flex justify-content-center btn-group">
              <button
                className="btn btn-lg tutorBtn"
                //onClick={this.handleEditVisibility}
              >
                Mon
              </button>
              <button className="btn btn-lg tutorBtn">Tues</button>
              <button className="btn btn-lg tutorBtn">Wed</button>
              <button className="btn btn-lg tutorBtn">Thurs</button>
              <button className="btn btn-lg tutorBtn">Fri</button>
            </div>
            <Modal>
              <Modal.Header>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete {this.props.department} once
                deleted it cannot be reversed!
              </Modal.Body>
              <Modal.Footer>
                {" "}
                <button
                  //onClick={this.hideDeletePopupVisabilty}
                  className="btn btn-secondary"
                >
                  No
                </button>{" "}
                <button
                  //onClick={this.handleDeleteTutor}
                  className="btn btn-primary"
                >
                  Yes
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className={this.state.showEdit ? "showEdit" : "hideEdit"}>
          <div className="container-fluid">
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Role</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  // defaultValue={this.state.roleInput}
                  // onChange={this.handleRoleInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex justify-content-center trueEditRow"
                  : "row d-flex justify-content-center falseEditRow"
              }
            >
              {this.state.updateBtnState ? (
                <button
                  className="btn btn-lg tutorBtn"
                  //onClick={this.updateTutorInfo}
                >
                  Update tutor
                </button>
              ) : (
                <button className="btn btn-lg tutorBtn" disabled>
                  Update tutor
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };
  render() {
    return <div className="container">{this.renderPeerCategories()}</div>;
  }
}
export default AdminPeerCatRender;
