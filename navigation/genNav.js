import React from 'react';

import LandingPage from '../screens/landing/Landing';
import LoginPage from '../screens/login/Login';
import { createStackNavigator } from '@react-navigation/stack';

const Gentack = createStackNavigator();

export default function GenNav() {
  return (
    <Gentack.Navigator>
      <Gentack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
    </Gentack.Navigator>
  );
}
