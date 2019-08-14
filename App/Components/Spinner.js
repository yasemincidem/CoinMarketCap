// @flow
import React from 'react';
import ReactNativeSpinner from 'react-native-spinkit';
import * as colors from '../Theme/Colors'

type Props = {
  color: string,
};

const Spinner = (props: Props) => <ReactNativeSpinner type="Wave" color={props.color} />;

Spinner.defaultProps = {
  color: colors.primary,
};

export default Spinner;
