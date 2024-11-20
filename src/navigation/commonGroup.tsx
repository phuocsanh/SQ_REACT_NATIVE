import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './type';
import common from 'screens/common';

const Stack = createNativeStackNavigator<RootStackParamList>();

const commonGroup = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="CustomerInfo" component={common.CustomerInfo} />
      <Stack.Screen name="SearchProduct" component={common.SearchProduct} />
      <Stack.Screen name="PromotionScreen" component={common.PromotionScreen} />
      <Stack.Screen
        name="DetailFoodScreen"
        component={common.DetailFoodScreen}
      />
      <Stack.Screen
        name="SplitOrderScreen"
        component={common.SplitOrderScreen}
      />
      <Stack.Screen
        name="InvoiceDetailAtTableScreen"
        component={common.InvoiceDetailAtTableScreen}
      />
      <Stack.Screen
        name="ChooseTableScreen"
        component={common.ChooseTableScreen}
      />
      <Stack.Screen
        name="AddNewCustomerScreen"
        component={common.AddNewCustomerScreen}
      />
      <Stack.Screen
        name="InfoCustomerSavedScreen"
        component={common.InfoCustomerSavedScreen}
      />
      <Stack.Screen
        name="DetailPaymentScreen"
        component={common.DetailPaymentScreen}
      />

      <Stack.Screen name="PaymentScreen" component={common.PaymentScreen} />
      <Stack.Screen
        name="AddMenuInTableScreen"
        component={common.AddMenuInTableScreen}
      />
      <Stack.Screen
        name="SettingProfileScreen"
        component={common.SettingProfileScreen}
      />
      <Stack.Screen name="LanguageScreen" component={common.LanguageScreen} />
      <Stack.Screen name="PrintScreen" component={common.PrintScreen} />
      <Stack.Screen
        name="NotificationScreen"
        component={common.NotificationScreen}
      />
      <Stack.Screen name="ShowTableScreen" component={common.ShowTableScreen} />
      <Stack.Screen
        name="SettingBuyScreen"
        component={common.SettingBuyScreen}
      />
      <Stack.Screen
        name="SettingNotificationScreen"
        component={common.SettingNotificationScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={common.ChangePasswordScreen}
      />
      <Stack.Screen
        name="InvoiceDetailsScreen"
        component={common.InvoiceDetailsScreen}
      />
    </Stack.Group>
  );
};

export default commonGroup;
