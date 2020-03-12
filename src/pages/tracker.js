import React, { Component } from "react";

/**
 * The tracker page with information about the 12 next steps
 */
export default class Tracker extends Component {
  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set the title of the page
    document.title = "Tracker | Sober Buddy";
  }

  render() {
    return (
      <div id={"content"}>
        <h2>The Twelve Steps of Alcoholics Anonymous</h2>
        <p className={"list"}>
          <ol>
            <li>
              "We admitted we were powerless over alcohol- that our lives had
              become unmanageable."
            </li>
            <li>
              "Came to believe that a Power greater than ourselves could restore
              us to sanity."
            </li>
            <li>
              "Made a decision to turn our will and our lives over to the care
              of God as we understood Him."
            </li>
            <li>
              "Made a searching and fearless moral inventory of ourselves."
            </li>
            <li>
              "Admitted to God, to ourselves, and to another human being the
              exact nature of our wrongs."
            </li>
            <li>
              "We are entirely ready to have God remove all these defects of
              character."
            </li>
            <li>"Humbly asked Him to remove our shortcomings."</li>
            <li>
              "Made a list of all persons we had harmed, and became willing to
              make amends to them all."
            </li>
            <li>
              "Made direct amends to such people wherever possible, except when
              to do so would injure them or others."
            </li>
            <li>
              "Continued to take personal inventory and when we were wrong
              promptly admitted it."
            </li>
            <li>
              "Sought through prayer and meditation to improve our conscious
              contact with God as we understood Him, praying only for knowledge
              of His will for us and the power to carry that out."
            </li>
            <li>
              "Having had a spiritual awakening as the result of these steps, we
              tried to carry this message to alcoholics, and to practice these
              principles in all our affairs."
            </li>
          </ol>
        </p>
      </div>
    );
  }
}
