import React, { Component } from "react";
import PouchDB from "pouchdb";

//
// Props -
//
// rowType: true or false, determines style for row
// id: id of the tutor in the row
// pass: tutor's password
// programID: tutor's program
// phone: tutor's phone
// email: email of the tutor in the row
// address: tutor's street address
// city: tutor's city
// province: tutor's province
// role: tutor's role
//

// ----- TODO ------
// Input validation for entry into db
// Functionality on delete to remove tutor from db - should have a warning step
// Force a rerender on a successful update of tutor DB
// (Not a 100% needed, but would be nice. Might have to be done in AdminTutors)
//

class AdminTutorRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      passInput: this.props.pass,
      progInput: this.props.programID,
      phoneInput: this.props.phone,
      emailInput: this.props.email,
      addressInput: this.props.address,
      cityInput: this.props.city,
      provinceInput: this.props.province,
      roleInput: this.props.role,
      updateBtnState: false
    };
  }

  componentDidMount = async () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    tDB
      .changes({ since: "now", live: true, include_docs: true })
      .on("change", () => {
        this.renderTutor();
        console.log("TUTOR DB UPDATED");
      });
  };

  handleEditVisibility = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handlePassInput = e => {
    this.setState({ passInput: e.target.value, updateBtnState: true });
  };

  handleProgInput = e => {
    this.setState({ progInput: e.target.value, updateBtnState: true });
  };

  handlePhoneInput = e => {
    this.setState({ phoneInput: e.target.value, updateBtnState: true });
  };

  handleEmailInput = e => {
    this.setState({ emailInput: e.target.value, updateBtnState: true });
  };

  handleAddressInput = e => {
    this.setState({ addressInput: e.target.value, updateBtnState: true });
  };

  handleCityInput = e => {
    this.setState({ cityInput: e.target.value, updateBtnState: true });
  };

  handleProvinceInput = e => {
    this.setState({ provinceInput: e.target.value, updateBtnState: true });
  };

  handleRoleInput = e => {
    this.setState({ roleInput: e.target.value, updateBtnState: true });
  };

  renderTutor = () => {
    return (
      <div>
        <div
          className={
            this.props.rowType
              ? "row d-flex justify-content-center trueRow"
              : "row d-flex justify-content-center falseRow"
          }
        >
          <div className="col">
            <div className="row d-flex justify-content-center">
              <h3>Tutor: {this.props.email}</h3>
            </div>
            <div className="row d-flex justify-content-around">
              <button
                className="btn btn-lg tutorBtn"
                onClick={this.handleEditVisibility}
              >
                Edit tutor
              </button>
              <button className="btn btn-lg tutorBtn">Delete tutor</button>
            </div>
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
                <h4>Password</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.passInput}
                  onChange={this.handlePassInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Program ID</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.progInput}
                  onChange={this.handleProgInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Phone Number</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.phoneInput}
                  onChange={this.handlePhoneInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Email</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.emailInput}
                  onChange={this.handleEmailInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Street Address</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.addressInput}
                  onChange={this.handleAddressInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>City</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.cityInput}
                  onChange={this.handleCityInput}
                />
              </div>
            </div>
            <div
              className={
                this.props.rowType
                  ? "row d-flex trueEditRow"
                  : "row d-flex falseEditRow"
              }
            >
              <div className="col-6 text-center">
                <h4>Province</h4>
              </div>
              <div className="col-6 text-center">
                <input
                  className="form-control"
                  defaultValue={this.state.provinceInput}
                  onChange={this.handleProvinceInput}
                />
              </div>
            </div>
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
                  defaultValue={this.state.roleInput}
                  onChange={this.handleRoleInput}
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
                  onClick={this.updateTutorInfo}
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
      </div>
    );
  };

  updateTutorInfo = () => {
    let tDB = new PouchDB(
      "https://b705ce6d-2856-466b-b76e-7ebd39bf5225-bluemix.cloudant.com/tutors"
    );

    let t = this;
    tDB
      .get(this.props.id)
      .then(function(doc) {
        if (
          t.state.passInput !== t.props.pass &&
          t.state.passInput.trim() !== ""
        ) {
          doc.password = t.state.passInput;
        }

        if (
          t.state.progInput !== t.props.programID &&
          t.state.progInput.trim() !== ""
        ) {
          doc.programID = t.state.progInput;
        }

        if (
          t.state.phoneInput !== t.props.phone &&
          t.state.phoneInput.trim() !== ""
        ) {
          doc.phoneNumber = t.state.phoneInput;
        }

        //
        // Since ID runs off email, need proper validation first
        // Will have to update ._id here to whatever comes before
        // @ in email
        //
        // if (
        //   t.state.emailInput !== t.props.email &&
        //   t.state.emailInput.trim() !== ""
        // ) {
        //   doc.email = t.state.emailInput;
        // }

        if (
          t.state.addressInput !== t.props.address &&
          t.state.addressInput.trim() !== ""
        ) {
          doc.streetAddress = t.state.addressInput;
        }

        if (
          t.state.cityInput !== t.props.city &&
          t.state.cityInput.trim() !== ""
        ) {
          doc.city = t.state.cityInput;
        }

        if (
          t.state.provinceInput !== t.props.province &&
          t.state.provinceInput.trim() !== ""
        ) {
          doc.province = t.state.provinceInput;
        }

        if (
          t.state.roleInput !== t.props.role &&
          t.state.roleInput.trim() !== ""
        ) {
          doc.role = t.state.roleInput;
        }
        t.setState({ updateBtnState: false });
        return tDB.put(doc);
      })
      .then(() => {
        return tDB.get(t.props.id);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  checkUpdateTutorButton = () => {
    if (
      this.state.passInput === this.props.pass &&
      this.state.progInput === this.props.programID &&
      this.state.phoneInput === this.props.phone &&
      this.state.emailInput === this.props.email &&
      this.state.addressInput === this.props.address &&
      this.state.cityInput === this.props.city &&
      this.state.provinceInput === this.props.province &&
      this.state.roleInput === this.props.role
    )
      return false;
    else return true;
  };

  render() {
    return <div className="container">{this.renderTutor()}</div>;
  }
}

export default AdminTutorRender;
