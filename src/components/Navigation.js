/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import "./Navigation.css";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <i className="fas fa-home"></i>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;