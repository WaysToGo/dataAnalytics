import React, { Component } from "react";

import { Transition } from "react-spring";
import Portal from "../common/Portal";
import Icon from "./Icon";

export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Portal>
        <Transition
          from={{ opacity: 0, bgOpacity: 0, y: -50 }}
          enter={{ opacity: 1, bgOpacity: 0.5, y: 0 }}
          leave={{ opacity: 0, bgOpacity: 0, y: 50 }}
        >
          {on &&
            (styles => (
              <div className="modal-wrapper">
                <div
                  className="modal-card"
                  style={{
                    transform: `translate3d(0, ${styles.y}px, 0)`,
                    ...styles
                  }}
                >
                  <div className="close-button" onClick={toggle}>
                    <Icon name="close" />
                  </div>
                  <div>{children}</div>
                </div>
                <div
                  className="modal-background"
                  style={{ opacity: styles.bgOpacity }}
                  onClick={toggle}
                />
              </div>
            ))}
        </Transition>
      </Portal>
    );
  }
}
