import React, { Component } from "react";

export default class Loading extends Component {
  state = { loading: this.props.loading };

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
