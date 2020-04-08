import React, { Component } from "react";
import "../css/appointmentBookingRow.css";

//
// Props -
//
// timeSlot: time value of the appointment slot in 24hr
// rowClick: function in parent to push value of row
// into selectedTimes state
// selectedTimes: array from parent of all currently selected times
//

class AppointmentBookingRow extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  componentDidMount = () => {};

  componentDidUpdate = (prevProps) => {
    if (this.props.selectedTimes !== prevProps.selectedTimes) {
      let isClicked = this.props.selectedTimes.includes(this.props.timeSlot);
      if (isClicked) {
        this.setState({ clicked: true });
      } else {
        this.setState({ clicked: false });
      }
    }
  };

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
