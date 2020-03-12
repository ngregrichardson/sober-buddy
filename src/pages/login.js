import React, { Component } from "react";
import * as firebase from "firebase/app";
import { withRouter } from "react-router";
import "firebase/auth";
import "firebase/firestore";
import Loading from "../components/loading";

class Login extends Component {
  state = {
    username: "",
    password: "",
    statusMessage: "",
    loading: false
  };

  componentDidMount() {
    document.title = "Login | Sober Buddy";
  }

  handleValueChange = (key, value) => {
    let toChange = {};
    toChange[key] = value;
    this.setState(toChange);
  };

  handleLogin = () => {
    this.setState({ loading: true });
    let { username, password } = this.state;
    if (username.trim() === "" || password.trim() === "") {
      return this.setState({ statusMessage: "Fill out all fields" });
    }
    firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .limit(1)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          firebase
            .auth()
            .signInWithEmailAndPassword(doc.data().email, password)
            .then(() => this.props.history.push("/profile"))
            .catch(e => {
              this.setState({ statusMessage: e.message, loading: false });
            });
        });
      });
  };

  _handleKeyDown = e => {
    if (e.key === "Enter") {
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
