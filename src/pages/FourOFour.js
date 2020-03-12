import React, { Component } from "react";

/**
 * No page found
 */
export default class FourOFour extends Component {
  render() {
    return (
      <div id={"content"}>
        <h1 style={{ textAlign: "center", marginTop: 30 }}>
          Sorry, we couldn't find that page
        </h1>
        <img
          alt={"logo"}
          src={"/logo.png"}
          style={{
            display: "block",
            margin: "auto",
            marginTop: 30,
            width: "10%"
          }}
        />
      </div>
    );
  }
}
