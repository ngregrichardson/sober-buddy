import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as firebase from "firebase/app";
import { withAlert } from "react-alert";
import "firebase/firestore";
import "firebase/auth";

class Profile extends Component {
  state = {
    authed: this.props.authed,
    user: this.props.user,
    timeDiff: "00:00:00"
  };

  static getDerivedStateFromProps(props, state) {
    let propsToUpdate = {};
    if (props.authed !== state.authed) {
      propsToUpdate.authed = props.authed;
    }
    if (props.user !== state.user) {
      propsToUpdate.user = props.user;
    }
    if (Object.keys(propsToUpdate).length !== 0) {
      return propsToUpdate;
    }
    return null;
  }

  componentDidMount() {
    document.title = "Profile | Sober Buddy";
  }

  resetTimer = () => {
    let { user } = this.state;
    let started = moment().toISOString();
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ started })
      .then(() => {
        this.props.updateUser({ ...user, started });
        this.updateTimer();
        this.props.alert.success("Your sobriety timer was reset");
      })
      .catch(() => {
        this.props.alert.error(
          "There was a problem resetting your sobriety timer"
        );
      });
  };

  startTimer = () => {
    this.updateTimer();
    this.timer = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    let difference = moment().diff(moment(this.state.user.started), "seconds");
    let duration = moment.duration(difference, "seconds").asSeconds();
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hours * 3600) / 60);
    let seconds = duration - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    this.setState({
      timeDiff: hours + ":" + minutes + ":" + seconds
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  resetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.user.email)
      .then(() => this.props.alert.success("A password email has been sent!"));
  };

  render() {
    let { user, timeDiff } = this.state;
    if (user !== null) {
      if (this.timer === undefined) {
        this.startTimer();
      }
      return (
        <div id={"content"}>
          <h1>My Profile</h1>
          <p>{user.username}</p>
          <button onClick={this.resetPassword} style={{ padding: 10 }}>
            Reset Password
          </button>
          <h1>Sobriety Timer</h1>
          <p>{timeDiff}</p>
          <button onClick={this.resetTimer} style={{ padding: 10 }}>
            Reset Timer
          </button>
        </div>
      );
    }
    return null;
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.user,
    authed: state.authed
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch({ type: "UPDATE_USER", user })
  };
};

export default withAlert()(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
