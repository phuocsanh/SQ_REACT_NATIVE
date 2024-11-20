// import RC from '@react-native-firebase/remote-config';

// type AppDeeplinkConfig = {
//   /**
//    * key_live_xxxx
//    * @see https://dashboard.branch.io/account-settings/profile
//    */
//   key: string;
//   /**
//    * 123456xxxx
//    * @see https://dashboard.branch.io/account-settings/profile
//    */
//   app_id: string;
//   /**
//    * api_app_xxxx
//    * @see https://dashboard.branch.io/account-settings/user
//    */
//   access_token: string;
//   /**
//    * secret_live_xxxx
//    * @see https://dashboard.branch.io/account-settings/profile
//    */
//   secret: string;
// };

// type App = 'main' | 'driver' | 'merchant';

// const remoteConfig = {
//   /**
//    * Bắt buộc tài xế xác minh OTP khi đăng ký
//    */
//   getRequiredRegisterOTP: () => {
//     return RC().getBoolean('required_register_otp');
//   },
//   getIntervalUpdatePosition: () => {
//     return RC().getNumber('interval_update_position') || 10000;
//   },
//   getIntervalUpdatePositionFirebase: () => {
//     return RC().getNumber('interval_update_position_firebase') || 5000;
//   },
//   getIntervalUpdatePositionCms: () => {
//     return RC().getNumber('interval_update_position_cms') || 50000;
//   },
//   getCurrentStoreVersion: () => {
//     const current_version_store = RC().getString('current_version_store');
//     if (current_version_store) {
//       return JSON.parse(current_version_store) as {version: string; mandatory: boolean};
//     }
//     return null;
//   },
//   getGoongApiKey: () => {
//     return RC().getString('goong_api_key_driver');
//   },
//   getGoongManyApiKey: () => {
//     return RC().getString('goong_many_api_key');
//   },
//   getInternalIps: () => {
//     return RC().getString('internal_ips');
//   },
//   getHideUnwanted: () => {
//     return RC().getBoolean('hide_unwanted');
//   },
//   getHideUi: () => {
//     return RC().getBoolean('hide_ui');
//   },
//   getAFConfig: () => {
//     const af_config = RC().getString('apps_flyer');
//     if (af_config) {
//       return JSON.parse(af_config) as {
//         dev_key: string;
//         app_id: string;
//         link_template_id: string;
//       };
//     }
//     return null;
//   },
//   getDeeplinkConfig: (app?: App) => {
//     const deeplink_config = RC().getString('deeplink');
//     if (deeplink_config) {
//       const config = JSON.parse(deeplink_config) as {
//         [key in App]: AppDeeplinkConfig;
//       };
//       return config[app || 'driver'];
//     }
//     return null;
//   },
//   setup: async () => {
//     // const DEFAULT_VALUE = {
//     // };
//     // await RC().setDefaults(DEFAULT_VALUE);
//     await RC().setConfigSettings({
//       minimumFetchIntervalMillis: 5 * 60 * 1000,
//     });
//     await RC().fetchAndActivate();
//   },
// };

// export default remoteConfig;
