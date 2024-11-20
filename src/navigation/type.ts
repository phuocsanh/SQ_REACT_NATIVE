import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainBottomTabParamList = {
  Home: undefined;
  ManagementOrder: undefined;
  TableRoom: undefined;
  Payment: undefined;
  Profile: undefined;
};

export type MainBottomTabScreenProps<T extends keyof MainBottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainBottomTabParamList, T>,
    MainBottomTabProps
  >;

export type HomeScreenProps = MainBottomTabScreenProps<'Home'>;
export type ProfileScreenProps = MainBottomTabScreenProps<'Profile'>;

export type RootStackParamList = {
  MainBottomTab: NavigatorScreenParams<MainBottomTabParamList>;
  CustomerInfo: undefined;
  SearchProduct: undefined;
  PromotionScreen: undefined;
  DetailFoodScreen: undefined;
  SplitOrderScreen: undefined;
  InvoiceDetailAtTableScreen: undefined;
  ChooseTableScreen: undefined;
  AddNewCustomerScreen: undefined;
  InfoCustomerSavedScreen: undefined;
  DetailPaymentScreen: undefined;
  PaymentScreen: undefined;
  AddMenuInTableScreen: undefined;
  SettingProfileScreen: undefined;
  LanguageScreen: undefined;
  PrintScreen: undefined;
  NotificationScreen: undefined;
  ShowTableScreen: undefined;
  SettingBuyScreen: undefined;
  SettingNotificationScreen: undefined;
  ChangePasswordScreen: undefined;
  InvoiceDetailsScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainBottomTabProps = RootStackScreenProps<'MainBottomTab'>;
