import { Component } from "react";

export default class Toggle extends Component {
  static defaultProps = {
    initial: false
  };

  state = {
    on: this.props.initial
  };

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render() {
    const { children } = this.props;
    return children({ ...this.state, toggle: this.toggle });
  }
}
