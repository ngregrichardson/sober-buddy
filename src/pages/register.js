import React, { Component } from "react";
import * as firebase from "firebase/app";
import { withRouter } from "react-router";
import "firebase/auth";
import "firebase/firestore";
import moment from "moment";
import Loading from "../components/loading";

/**
 * The register page to create new accounts
 */
class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    statusMessage: "",
    loading: false
  };

  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set the title of the page
    document.title = "Register | Sober Buddy";
  }

  /**
   * Update a value in the state when it is changed
   * @param {string} key - The key of the value to update
   * @param {string} value - The value to update
   */
  handleValueChange = (key, value) => {
    let toChange = {};
    toChange[key] = value;
    this.setState(toChange);
  };

  /**
   * Register the user
   */
  handleRegister = () => {
    // Start loading
    this.setState({ loading: true });
    let { username, email, password, confirmPassword } = this.state;
    // If not all fields are filled out
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      // Display error
      return this.setState({ statusMessage: "Fill out all fields" });
    }
    // If the password and confirm password don't match
    if (password.trim() !== confirmPassword.trim()) {
      // Display error
      return this.setState({ statusMessage: "Passwords must match" });
    }
    // If the email is not a valid email
    if (
      !email.includes("@") ||
      !email
        .split("@")[1]
        .trim()
        .includes(".") ||
      email.split("@")[1].trim() === ""
    ) {
      // Display error
      return this.setState({ statusMessage: "Must provide a valid email" });
    }
    // Create a new user
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
        // Create a user in the database
        firebase
          .firestore()
          .collection("users")
          .doc(userData.user.uid)
          .set({
            username,
            email,
            uid: userData.user.uid,
            started: moment().toISOString()
          })
          .then(() => this.props.history.push("/profile")) // Navigate to profile
          .catch(e => {
            // Display error
            this.setState({ statusMessage: e.message, loading: false });
          });
      })
      .catch(e => {
        // Display error
        this.setState({ statusMessage: e.message, loading: false });
      });
  };

  /**
   * Submit the form when the enter key is pressed
   * @param e
   * @private
   */
  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleRegister();
    }
  };

  render() {
    let {
      username,
      email,
      password,
      confirmPassword,
      statusMessage,
      loading
    } = this.state;
    return (
      <div id={"content"}>
        <Loading loading={loading} />
        <div className={"form"}>
          <h1>Register</h1>
          <div className={"formRow"}>
            <label htmlFor={"username"} className={"leftLabel"}>
              Username:
            </label>
            <input
              name={"username"}
              type={"text"}
              className={"rightInput"}
              value={username}
              onChange={e => this.handleValueChange("username", e.target.value)}
              onKeyDown={this._handleKeyDown}
            />
          </div>
          <div className={"formRow"}>
            <label htmlFor={"email"} className={"leftLabel"}>
              Email:
            </label>
            <input
              name={"email"}
              type={"email"}
              className={"rightInput"}
              value={email}
              onChange={e => this.handleValueChange("email", e.target.value)}
              onKeyDown={this._handleKeyDown}
            />
          </div>
          <div className={"formRow"}>
            <label htmlFor={"password"} className={"leftLabel"}>
              Password:
            </label>
            <input
              name={"password"}
              type={"password"}
              className={"rightInput"}
              value={password}
              onChange={e => this.handleValueChange("password", e.target.value)}
              onKeyDown={this._handleKeyDown}
            />
          </div>
          <div className={"formRow"}>
            <label htmlFor={"confirm-password"} className={"leftLabel"}>
              Confirm Password:
            </label>
            <input
              name={"confirm-password"}
              type={"password"}
              className={"rightInput"}
              value={confirmPassword}
              onChange={e =>
                this.handleValueChange("confirmPassword", e.target.value)
              }
              onKeyDown={this._handleKeyDown}
            />
          </div>
          <button
            className={"rightInput submitButton"}
            style={{ marginTop: 25 }}
            onClick={this.handleRegister}
          >
            Submit
          </button>
          <span style={{ marginTop: 10, color: "red" }}>{statusMessage}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
