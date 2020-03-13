import React, { Component } from "react";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0
    };
  }

  componentDidMount = () => {
    setInterval(() => {
      if (this.state.seconds < 60)
        this.setState({
          seconds: this.state.seconds + 1
        });

      if (this.state.seconds === 60) {
        if (this.state.minutes === 15) clearInterval(this.timer);
        else {
          this.setState({
            minutes: this.state.minutes + 1
          });
          this.setState({ seconds: 0 });
        }
      }
    }, 1000);
  };

  renderTimer = () => {
    // let minutes = this.props.minutes;
    // let seconds = 0;
    // return (
    //   <div>
    //     <h3>
    //       {minutes} : {seconds}
    //     </h3>
    //   </div>
    // );
  };

  render() {
    return (
      <div>
        {this.state.minutes} : {this.state.seconds}
      </div>
    );
  }
}

export default CountdownTimer;
