
import { createAppContainer, createStackNavigator } from 'react-navigation'

import ListingsLatestContainer from '../Containers/ListingsLatestContainer'
import React from 'react';
import {Text} from 'react-native-elements';

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
  {
    // Create the application routes here (the key is the route name, the value is the target screen)
    // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
    ListingsLatestContainer: ListingsLatestContainer,
  },
  {
    // By default the application will show the splash screen
    initialRouteName: 'ListingsLatestContainer',
    // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
    defaultNavigationOptions: {
      title: 'Coin Market Cap',
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
        color: 'black'
      },
    },
  }
);

export default createAppContainer(StackNavigator)
