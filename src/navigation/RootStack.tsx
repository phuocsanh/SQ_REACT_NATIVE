import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRoot} from './navigationRef';
import MainBottomTabs from './MainBottomTabs';
import {RootStackParamList} from './type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {
  const handleReady = () => {
    BootSplash.hide();
  };

  return (
    <NavigationContainer ref={navigationRoot} onReady={handleReady}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainBottomTab" component={MainBottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
