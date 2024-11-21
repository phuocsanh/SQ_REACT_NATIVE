import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {navigationRoot} from './navigationRef';
import MainBottomTabs from './MainBottomTabs';
import {RootStackParamList} from './type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import {useAppSelector} from 'redux/hooks';
import authGroup from './authGroup';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootStack = () => {
  const userToken = useAppSelector(state => state?.auth?.userToken);
  const handleReady = () => {
    BootSplash.hide();
  };

  return (
    <NavigationContainer ref={navigationRoot} onReady={handleReady}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken ? (
          <Stack.Screen name="MainBottomTab" component={MainBottomTabs} />
        ) : (
          authGroup()
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
