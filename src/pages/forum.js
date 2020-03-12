import React, { Component } from "react";

/**
 * The forum page for posts and discussion
 */
export default class Forum extends Component {
  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set the title of the page
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
