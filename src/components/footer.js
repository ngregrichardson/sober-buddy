import React, { Component } from "react";
import moment from "moment";

export default class Footer extends Component {
  render() {
    return (
      <div id={"footer"}>
        <span id={"footerText"}>
          Made by Noah Richardson with <span role={"img"}>❤</span>️ |{" "}
          {moment().year()} | v{process.env.REACT_APP_VERSION}
        </span>
      </div>
    );
  }
}
