import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import "firebase/auth";

/**
 * The nav bar using React Router
 */
class NavBar extends Component {
  state = {
    authed: this.props.authed || false
  };

  /**
   * Update the state when/if the props change
   * @param props - The new props
   * @param state - The current state
   * @returns {{}|null} - The state values to update
   */
  static getDerivedStateFromProps(props, state) {
    let propsToUpdate = {};
    if (props.authed !== state.authed) {
      propsToUpdate.authed = props.authed;
    }
    if (Object.keys(propsToUpdate).length !== 0) {
      return propsToUpdate;
    }
    return null;
  }

  /**
   * Log the user out
   */
  handleLogout = () => {
    // Log out of firebase
    firebase
      .auth()
      .signOut()
      .then(() => this.props.history.push("/")); // Navigate to the home page
  };

  render() {
    let { authed } = this.state;
    return (
      <div id={"navBar"}>
        <ul className={"navBarLinksContainer"}>
          <NavLink
            exact
            to={"/"}
            activeClassName={"current"}
            className={"navBarLink"}
          >
            Home
          </NavLink>
          <NavLink
            to={"/tracker"}
            activeClassName={"current"}
            className={"navBarLink"}
          >
            Tracker
          </NavLink>
          <NavLink
            to={"/forum"}
            activeClassName={"current"}
            className={"navBarLink"}
          >
            Forum
          </NavLink>
          <NavLink
            to={"/about"}
            activeClassName={"current"}
            className={"navBarLink"}
          >
            About
          </NavLink>
          <NavLink
            to={"/support"}
            activeClassName={"current"}
            className={"navBarLink"}
          >
            Support
          </NavLink>
        </ul>
        {authed ? (
          <ul className={"navBarLinksContainer"}>
            <NavLink
              to={"/profile"}
              activeClassName={"current"}
              className={"navBarLink"}
            >
              Profile
            </NavLink>
            <li
              className={"navBarLink"}
              style={{ cursor: "pointer" }}
              onClick={this.handleLogout}
            >
              Logout
            </li>
          </ul>
        ) : (
          <ul className={"navBarLinksContainer"}>
            <NavLink
              to={"/login"}
              activeClassName={"current"}
              className={"navBarLink"}
            >
              Login
            </NavLink>
            <NavLink
              to={"/register"}
              activeClassName={"current"}
              className={"navBarLink"}
            >
              Register
            </NavLink>
          </ul>
        )}
      </div>
    );
  }
}

/**
 * Load the Redux state into props
 * @param state - The Redux state
 * @param ownProps - The component's props
 * @returns {Object} - The proposed state
 */
let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authed: state.authed
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
