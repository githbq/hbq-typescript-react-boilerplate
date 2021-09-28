import * as React from "react";
import "./style.less";

interface State {
  abc: number;
}
interface Props {}
/**
 * 组件demo
 */
export default class extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="demo-component">这是Detail组件</h1>
      </div>
    );
  }
}
