import React, { Component } from "react";

export default class Forum extends Component {
  componentDidMount() {
    document.title = "Forum | Sober Buddy";
  }

  render() {
    return (
      <div id={"content"}>
        <span>Forum content to go here</span>
      </div>
    );
  }
}
