import React, { Component } from "react";
import "../css/appointmentBookingRow.css";

//
// Props -
//
// timeSlot: time value of the appointment slot in 24hr
// rowClick: function in parent to push value of row
// into selectedTimes state
//

class AppointmentBookingRow extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  handleRowAndClass = () => {
    this.props.rowClick(this.props.timeSlot);
    this.setState({ clicked: !this.state.clicked });
    console.log(this.state.clicked);
  };

  render() {
    return (
      <div
        className="row"
        onClick={this.handleRowAndClass}
        className={this.state.clicked ? "rowSelected" : "rowDefault"}
      >
        <div className="col">{this.props.timeSlot}</div>
      </div>
    );
  }
}

export default AppointmentBookingRow;
