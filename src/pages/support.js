import React, { Component } from "react";

export default class Support extends Component {
  componentDidMount() {
    document.title = "Support | Sober Buddy";
  }

  render() {
    return (
      <div id={"content"}>
        <div className={"form"}>
          <h1>Support</h1>
          <div className={"formRow"}>
            <label htmlFor={"name"} className={"leftLabel"}>
              Name:
            </label>
            <input name={"name"} type={"text"} className={"rightInput"} />
          </div>
          <div className={"formRow"}>
            <label htmlFor={"email"} className={"leftLabel"}>
              Email:
            </label>
            <input name={"email"} type={"email"} className={"rightInput"} />
          </div>
          <div className={"formRow"}>
            <label htmlFor={"message"} className={"leftLabel"}>
              Message:
            </label>
            <textarea name={"message"} className={"rightInput"} rows={"5"} />
          </div>
          <div className={"formRow"}>
            <p className={"leftLabel"}>
              If this doesn't work, send an email to{" "}
              <a
                href={"mailto:gdb53@drexel.edu"}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
            <input type={"submit"} className={"rightInput submitButton"} />
          </div>
        </div>
      </div>
    );
  }
}
