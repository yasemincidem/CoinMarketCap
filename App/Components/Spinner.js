// @flow
import React from 'react';
import ReactNativeSpinner from 'react-native-spinkit';
import * as colors from '../../colors'

type Props = {
  color: string,
};

const Spinner = (props: Props) => <ReactNativeSpinner type="Wave" color={props.color} />;

Spinner.defaultProps = {
  color: colors.primary,
};

export default Spinner;
