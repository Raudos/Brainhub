import React from "react";
const R = require('ramda');

export default Component => {
  return class PureComponentRenderer extends React.Component {
    shouldComponentUpdate(nextProps) {
      return this.props.value !== nextProps.value || !R.equals(this.props.error, nextProps.error);
    };

    render() {
      return (
        <Component {...this.props} />
      );
    }
  };
};
