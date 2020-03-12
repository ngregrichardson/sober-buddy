import React, { Component } from "react";

/**
 * A fullscreen loading animation
 */
export default class Loading extends Component {
  state = { loading: this.props.loading };

  /**
   * Update the state when/if the props change
   * @param props - The new props
   * @param state - The current state
   * @returns {{}|null} - The state values to update
   */
  static getDerivedStateFromProps(props, state) {
    let propsToUpdate = {};
    if (props.loading !== state.loading) {
      propsToUpdate.loading = props.loading;
    }
    if (Object.keys(propsToUpdate).length !== 0) {
      return propsToUpdate;
    }
    return null;
  }

  render() {
    let { loading } = this.state;
    if (loading) {
      return (
        <div className={"loadingBackground"}>
          <div className="lds-ripple">
            <div />
            <div />
          </div>
        </div>
      );
    }
    return null;
  }
}
