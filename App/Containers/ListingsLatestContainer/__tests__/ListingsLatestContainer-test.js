import 'react-native';
import React from 'react';
import {shallow} from "react-native/jest/renderer";
import ListingsLatestContainer from '../index';

describe('ListingsLatest Container', () => {
  const defaultProps = {};
  const createWrapper = (customProps) => {
    const props = {...defaultProps, ...customProps};
    return shallow(<ListingsLatestContainer {...props} />);
  };
  it('should be rendered correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  it('should return correct number', () => {
    const wrapper = createWrapper();
    console.log('wrapper', wrapper);
    // expect(wrapper.root.instance.formatWithFloat(0.12322255666)).toEqual(0.12322256)
  })
});
