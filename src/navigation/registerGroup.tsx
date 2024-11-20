import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import register from 'screens/register';
import {RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const registerGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="CompleteRegistrationScreen"
        component={register.CompleteRegistrationScreen}
      />
    </Stack.Group>
  );
};

export default registerGroup;
