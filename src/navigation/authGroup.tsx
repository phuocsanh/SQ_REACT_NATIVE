import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import auth from 'screens/auth';
import {RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const authGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="RegisterScreen" component={auth.RegisterScreen} />
      <Stack.Screen name="LoginScreen" component={auth.LoginScreen} />
    </Stack.Group>
  );
};

export default authGroup;
