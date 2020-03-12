import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as firebase from "firebase/app";
import { withAlert } from "react-alert";
import "firebase/firestore";
import "firebase/auth";

/**
 * The profile page for display the user's username, reset password button, and sobriety timer
 */
class Profile extends Component {
  state = {
    authed: this.props.authed,
    user: this.props.user,
    timeDiff: "00:00:00"
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
    if (props.user !== state.user) {
      propsToUpdate.user = props.user;
    }
    if (Object.keys(propsToUpdate).length !== 0) {
      return propsToUpdate;
    }
    return null;
  }

  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set the title of the page
    document.title = "Profile | Sober Buddy";
  }

  /**
   * Reset the user's sobriety timer
   */
  resetTimer = () => {
    let { user } = this.state;
    // Get the new starting time
    let started = moment().toISOString();
    // Update the user's starting time in the database
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({ started })
      .then(() => {
        // Update the user in Redux
        this.props.updateUser({ ...user, started });
        // Update the timer
        this.updateTimer();
        // Display success alert
        this.props.alert.success("Your sobriety timer was reset");
      })
      .catch(() => {
        // Display error alert
        this.props.alert.error(
          "There was a problem resetting your sobriety timer"
        );
      });
  };

  /**
   * Start the sobriety timer
   */
  startTimer = () => {
    // Update the timer
    this.updateTimer();
    // Start update interval every second
    this.timer = setInterval(this.updateTimer, 1000);
  };

  /**
   * Update the sobriety timer
   */
  updateTimer = () => {
    // Get the difference between the user's last reset time and now
    let difference = moment().diff(moment(this.state.user.started), "seconds");
    // Get that duration as seconds
    let duration = moment.duration(difference, "seconds").asSeconds();
    // Convert to hours, minutes, and seconds
    let hours = Math.floor(duration / 3600);
    let minutes = Math.floor((duration - hours * 3600) / 60);
    let seconds = duration - hours * 3600 - minutes * 60;

    // Handle 0 cases
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    // Update the timer
    this.setState({
      timeDiff: hours + ":" + minutes + ":" + seconds
    });
  };

  /**
   * Run before the component un-renders
   */
  componentWillUnmount() {
    // Stop the timer
    clearInterval(this.timer);
    this.timer = undefined;
  }

  /**
   * Send a password reset email
   */
  resetPassword = () => {
    // Send the reset email
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.user.email)
      .then(() => this.props.alert.success("A password email has been sent!")) // Display success alert
      .catch(() => {
        // Display error alert
        this.props.alert.error(
          "There was a problem resetting your sobriety timer"
        );
      });
  };

  render() {
    let { user, timeDiff } = this.state;
    // If the user isn't null, render the profile page
    if (user !== null) {
      // If the timer isn't running
      if (this.timer === undefined) {
        // Start the timer
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

/**
 * Load the Redux state into props
 * @param state - The Redux state
 * @param ownProps - The component's props
 * @returns {Object} - The proposed state
 */
let mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.user,
    authed: state.authed
  };
};

/**
 * Manipulate the Redux state
 */
let mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch({ type: "UPDATE_USER", user })
  };
};

export default withAlert()(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
