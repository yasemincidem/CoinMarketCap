// @flow
import * as React from 'react';
import styled from 'styled-components/native';
import Spinner from './Spinner';
import * as colors from '../../colors'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  /* stylelint-disable */
  ${(props) =>
  props.overlay &&
  `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.7;
  `} /* stylelint-enable */;
  ${(props) => (props.style ? props.style : '')};
`;

type Milliseconds = number;

type Props = {
  overlay?: boolean,
  style?: any,
  delay: Milliseconds,
};

type State = {
  isVisible: boolean,
};

class Loading extends React.Component<Props, State> {
  static defaultProps = {
    loading: false,
    delay: 0,
  };
  state = {
    isVisible: true,
  };
  timeout = null;

  constructor(props: Props) {
    super(props);
    if (this.props.delay > 0) {
      this.state.isVisible = false;
    }
  }

  componentDidMount() {
    const { delay } = this.props;
    if (delay > 0) {
      this.timeout = setTimeout(() => {
        this.setState({ isVisible: true });
      }, delay);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { style, overlay } = this.props;
    const { isVisible } = this.state;
    if (!isVisible) {
      return null;
    }
    return (
      <Container overlay={overlay} style={style}>
        <Spinner />
      </Container>
    );
  }
}

export default Loading;
