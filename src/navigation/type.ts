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
  LoginScreen: undefined;
  RegisterScreen: undefined;
  SearchProduct: undefined;
  PromotionScreen: undefined;
  PaymentScreen: undefined;
  SettingProfileScreen: undefined;
  ChangePasswordScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainBottomTabProps = RootStackScreenProps<'MainBottomTab'>;
export type LoginScreenProps = RootStackScreenProps<'LoginScreen'>;
