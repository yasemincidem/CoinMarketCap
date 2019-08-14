import React from 'react';
import {shallow} from "react-native/jest/renderer";
import Loading from '../Loading';

describe('Loading', () => {
  const defaultProps = {};

  const createWrapper = (overriddenProps) => {
    const props = {
      ...defaultProps,
      ...overriddenProps,
    };

    return shallow(<Loading {...props} />);
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
