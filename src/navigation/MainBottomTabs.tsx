import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import ManagementOrderScreen from 'screens/mainBottomTab/ManagementOrderScreen';
import {MainBottomTabParamList} from './type';

import {BottomFabBar} from 'rn-wave-bottom-bar';
import {COLORS} from 'theme';
import {ICONS} from 'assets';
import {Image, ImageSourcePropType} from 'react-native';
import {fontScale} from '../theme/helper';
import HomeScreen from 'screens/mainBottomTab/HomeScreen';
import TableRoomScreen from 'screens/mainBottomTab/TableRoomScreen';
import PaymentScreen from 'screens/mainBottomTab/PaymentScreen';
import ProfileScreen from 'screens/mainBottomTab/ProfileScreen';
const Tab = createBottomTabNavigator<MainBottomTabParamList>();

const tabBarIcon =
  (name: ImageSourcePropType) =>
  ({focused}: {focused: boolean}) =>
    <Image tintColor={focused ? 'white' : COLORS.gray} source={name} />;

const customBottomFabBar = (props: BottomTabBarProps) => (
  <BottomFabBar
    mode={'default'}
    // eslint-disable-next-line react-native/no-inline-styles
    focusedButtonStyle={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
    }}
    // eslint-disable-next-line react-native/no-inline-styles
    bottomBarContainerStyle={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }}
    {...props}
  />
);

const MainBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: 'white',
        tabBarLabelStyle: {
          fontSize: fontScale(14),
          fontWeight: '400',
        },
      }}
      tabBar={customBottomFabBar}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: tabBarIcon(ICONS.ic_home),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Bàn/Phòng',
          tabBarIcon: tabBarIcon(ICONS.ic_table_room),
        }}
        name="TableRoom"
        component={TableRoomScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Quản lý đơn',
          tabBarIcon: tabBarIcon(ICONS.ic_management_order),
        }}
        name="ManagementOrder"
        component={ManagementOrderScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Thanh toán',
          tabBarIcon: tabBarIcon(ICONS.ic_payment),
        }}
        name="Payment"
        component={PaymentScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: tabBarIcon(ICONS.ic_profile),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
export default MainBottomTabs;
