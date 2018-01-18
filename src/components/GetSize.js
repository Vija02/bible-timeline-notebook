import { Component } from 'react';
import sizeMe from 'react-sizeme'

class GetSize extends Component {
  componentWillMount() {
    this.props.OnDimensionUpdate({ width: this.props.size.width, height: this.props.size.height })
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.size.width !== nextProps.size.width) {
      this.props.OnDimensionUpdate({ width: nextProps.size.width, height: nextProps.size.height })
    }
  }
  render() {
    return (
      this.props.children
    );
  }
}

export default sizeMe()(GetSize)