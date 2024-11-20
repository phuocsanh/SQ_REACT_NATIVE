import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRoot} from './navigationRef';
import MainBottomTabs from './MainBottomTabs';
import commonGroup from './commonGroup';
import {RootStackParamList} from './type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRoot}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainBottomTab" component={MainBottomTabs} />
        {commonGroup()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
