import * as React from "react";
import { Route, Link, match } from "react-router-dom";

import * as PropTypes from "prop-types";
import "./style.less";
interface State {
  abc: number;
}
interface Props {
  match?: match<any>;
}
/**
 * 组件demo
 */
export default class extends React.Component<Props, State> {
  static contextTypes = {
    match: PropTypes.any,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className={styles["demo-component"]}>
          demo2222
          <a href="demo.html">跳转到demo</a>
          <b>{JSON.stringify(this.props.match ? this.props.match.params : {})}</b>
        </h1>
      </div>
    );
  }
}
