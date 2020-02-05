import React, { Component } from "react";
import { Link } from "react-router-dom";
//import { Logo } from "../logo.png";
import "../main.css";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navContainer">
        <Link to="/">
          <span className="navbar-brand">
            <div className="logoPH"> </div>
          </span>
        </Link>
        <div
          className="collapse navbar-collapse container-fluid"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">Learner Success Services</ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
