import 'react-native';
import React from 'react';
import {shallow} from "react-native/jest/renderer";
import App from '../App';

describe('App', () => {
  const defaultProps = {};
  const createWrapper = (customProps) => {
    const props = {...defaultProps, ...customProps};
    return shallow(<App {...props} />);
  };
  it('should be rendered correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
