import React, { Component } from "react";
import * as firebase from "firebase/app";
import { withRouter } from "react-router";
import "firebase/auth";
import "firebase/firestore";
import moment from "moment";
import Loading from "../components/loading";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    statusMessage: "",
    loading: false
  };

  componentDidMount() {
    document.title = "Register | Sober Buddy";
  }

  handleValueChange = (key, value) => {
    let toChange = {};
    toChange[key] = value;
    this.setState(toChange);
  };

  handleRegister = () => {
    this.setState({ loading: true });
    let { username, email, password, confirmPassword } = this.state;
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      email.trim() === ""
    ) {
      return this.setState({ statusMessage: "Fill out all fields" });
    }
    if (password.trim() !== confirmPassword.trim() || password.trim() === "") {
      return this.setState({ statusMessage: "Passwords must match" });
    }
    if (
      !email.includes("@") ||
      !email
        .split("@")[1]
        .trim()
        .includes(".") ||
      email.split("@")[1].trim() === ""
    ) {
      return this.setState({ statusMessage: "Must provide a valid email" });
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userData => {
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
          .then(() => this.props.history.push("/profile"));
      })
      .catch(e => {
        this.setState({ statusMessage: e.message, loading: false });
      });
  };

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
