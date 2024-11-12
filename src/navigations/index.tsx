import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

export type RootStackParamList = {
  home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNav = () => {
  return (
    <RootStack.Navigator
      initialRouteName={'home'}
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name={'home'} component={HomeScreen} />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  return <NavigationContainer>{AppNav()}</NavigationContainer>;
};

export default Navigation;
