import 'react-native';
import React from 'react';
import {shallow} from "react-native/jest/renderer";
import SortByModal from '../index';

describe('SortBy Modal', () => {
  const defaultProps = {};
  const createWrapper = (customProps) => {
    const props = {...defaultProps, ...customProps};
    return shallow(<SortByModal {...props} />);
  };
  it('should be rendered correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
