import React, { Component } from "react";
import * as firebase from "firebase/app";
import { withRouter } from "react-router";
import "firebase/auth";
import "firebase/firestore";
import Loading from "../components/loading";

/**
 * The login page
 */
class Login extends Component {
  state = {
    username: "",
    password: "",
    statusMessage: "",
    loading: false
  };

  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set tht title of the page
    document.title = "Login | Sober Buddy";
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
   * Log the user in
   */
  handleLogin = () => {
    // Start loading
    this.setState({ loading: true });
    let { username, password } = this.state;
    // If the username or password are blank
    if (username.trim() === "" || password.trim() === "") {
      // Return error
      return this.setState({ statusMessage: "Fill out all fields" });
    }
    // Get the email associated with the username
    firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // Sign the user in with the email and passowrd
          firebase
            .auth()
            .signInWithEmailAndPassword(doc.data().email, password)
            .then(() => this.props.history.push("/profile")) // Navigate to profile page
            .catch(e => {
              // Display error
              this.setState({ statusMessage: e.message, loading: false });
            });
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
    // If the key was the enter key
    if (e.key === "Enter") {
      // Login
      this.handleLogin();
    }
  };

  render() {
    let { username, password, statusMessage, loading } = this.state;
    return (
      <div id={"content"}>
        <Loading loading={loading} />
        <div className={"form"}>
          <h1>Login</h1>
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
          <button
            className={"rightInput submitButton"}
            style={{ marginTop: 25 }}
            onClick={this.handleLogin}
          >
            Submit
          </button>
          <span style={{ marginTop: 10, color: "red" }}>{statusMessage}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
