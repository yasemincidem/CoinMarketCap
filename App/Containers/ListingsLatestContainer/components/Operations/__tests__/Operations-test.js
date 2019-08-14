import 'react-native';
import React from 'react';
import {shallow} from "react-native/jest/renderer";
import Operations from '../index';

describe('Operation Component', () => {
  const defaultProps = {};
  const createWrapper = (customProps) => {
    const props = {...defaultProps, ...customProps};
    return shallow(<Operations {...props} />);
  };
  it('should be rendered correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
