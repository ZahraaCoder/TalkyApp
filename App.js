import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AuthStack from './navigation/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Screens/home';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }
}
