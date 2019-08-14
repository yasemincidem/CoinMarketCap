import React from 'react';
import {shallow} from "react-native/jest/renderer";
import Spinner from '../Spinner';

describe('Spinner', () => {
  const defaultProps = {};

  const createWrapper = (overriddenProps) => {
    const props = {
      ...defaultProps,
      ...overriddenProps,
    };

    return shallow(<Spinner {...props} />);
  };

  it('renders correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
