import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import auth from 'screens/mainBottomTab';
import {RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const authGroup = () => {
  return (
    <Stack.Group>
      {/* <Stack.Screen
        name="CheckPhoneLoginScreen"
        component={auth.CheckPhoneLoginScreen}
      /> */}
    </Stack.Group>
  );
};

export default authGroup;
