import React, { Component } from "react";

class CountUpTimer extends Component {
// --- PROPS ---
// minutes: is the value of mintues
// seconds: is the value of seconds
// interval: is what the counter goes up by
// --- PROPS --- 
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      interval: null
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    if (this._isMounted) {
      let interval = setInterval(() => {
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
      this.setState({ interval: interval });
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.state.interval);
    this._isMounted = false;
  };

  renderTimer = () => {
  };

  render() {
    return (
      <div>
        {this.state.minutes} : {this.state.seconds}
      </div>
    );
  }
}

export default CountUpTimer;