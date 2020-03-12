import React, { Component } from "react";

/**
 * The home page with general information about Sober Buddy
 */
export default class Home extends Component {
  /**
   * Run before component renders for the first time
   */
  componentDidMount() {
    // Set the title of the page
    document.title = "Home | Sober Buddy";
  }

  render() {
    return (
      <div id={"content"}>
        <h1>Sober Buddy</h1>
        <hr />
        <p className={"bold"}>Your personal Alcoholics Anonymous companion</p>
        <p className={"bold"}>
          "The sway of alcohol over mankind is unquestionably due to its power
          to stimulate the mystical faculties of human nature, usually crushed
          to earth by the cold facts and dry criticisms of the sober hour."
        </p>
        <span> -William James</span>
        <p>
          Sober Buddy is designed to help individuals with a desire to achieve
          and maintain sobriety. In this process, we will learn to manage such a
          cruel addiction, heal wounds that were never properly tended for, and
          take steps in becoming better, genuine individuals.
        </p>
        <p>
          Similar to local AA meetings near you, we will never ask you to reveal
          any personal information about yourself or your identity. This is
          always a safe space. Your privacy and recovery process deserve to be
          treated with such respect.
        </p>
        <h1 className={"bold italic"}>Who is Sober Buddy for?</h1>
        <p>This may be a beneficial recovery resource/supplement if:</p>
        <ul>
          <li>
            you do not have time to regularly attend Alcoholics Anonymous
            meetings
          </li>
          <li>you do not have access to substance abuse resources</li>
          <li>
            you want to additionally supplement your current recovery methods
          </li>
          <li>you are unsure how to start your recovery</li>
          <li>you need a safe space</li>
          <li>
            you or anyone you know is struggling from alcoholism/alcohol abuse
          </li>
          <li>
            you believe your experiences and stories may help or resonate with a
            recovering alcoholic.
          </li>
        </ul>
        <h1>Background on Alcoholics Anonymous</h1>
        <p>
          "Alcoholics Anonymous (AA) is a global, community-based program that
          was created to help those struggling with problematic drinking get
          sober with the support of their peers through daily meetings and
          discussions surrounding addiction.
        </p>
        <ul>
          <li>
            AA gives men and women a place to come together and share their
            experiences, recover from alcoholism and maintain sobriety.
          </li>
          <li>
            Its concept revolves around that premise that{" "}
            <strong>
              alcoholism is an illness that can be managed, but not controlled.
            </strong>
          </li>
        </ul>
        <p>
          Some people are put off by the idea of a higher power. But AA isn’t a
          religious organization. The higher power doesn’t have to be God, or
          any specific interpretation of God.
        </p>
      </div>
    );
  }
}
