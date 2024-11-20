// import messaging from '@react-native-firebase/messaging';
// // import {Platform} from 'react-native';
// // import notifee, {AndroidCategory, AndroidImportance} from '@notifee/react-native';
// import {FcmMessage} from 'models';
// import storage, {StorageMessageKey} from 'util/storage';
// import Geolocation from 'react-native-geolocation-service';
// import store from 'redux/store';
// import {updatePosition} from 'redux/other/asyncThunk';

// export function setBackgroundMessage() {
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     if (__DEV__) {
//       console.log('%c FIREBASE_MESSAGE_NOTIFICATION_FROM_BACKGROUND: ', remoteMessage);
//     }
//     const message = remoteMessage as FcmMessage;
//     saveMessage(message);
//     const type = message.data?.type;
//     if (type === 'driverPosition') {
//       handleUpdatePosition();
//     }
//   });
// }

// const getCurrentPosition = (retry = 3) => {
//   Geolocation.getCurrentPosition(
//     position => {
//       const {
//         coords: {latitude, longitude, heading},
//         mocked,
//       } = position;
//       if (latitude && longitude) {
//         store.dispatch(updatePosition({latitude, longitude, heading, mocked}));
//       } else if (retry > 0) {
//         getCurrentPosition(retry - 1);
//       }
//     },
//     (_err: Geolocation.GeoError) => {},
//     {enableHighAccuracy: true},
//   );
// };

// const saveMessage = (message: FcmMessage) => {
//   const type = message.data?.type;
//   let keyStorage: StorageMessageKey = 'messageDefault';
//   if (type) {
//     switch (type) {
//       case 'newNotification':
//         keyStorage = 'newNotification';
//         break;
//       case 'customerCancelDelivery':
//       case 'customerCancelBooking':
//       case 'adminCancel':
//         keyStorage = 'messageTripCancel';
//         break;
//       case 'changeRoute':
//       case 'driverBooking':
//         keyStorage = 'messageBooking';
//         break;
//       case 'driverDelivery':
//         keyStorage = 'messageDelivery';
//         break;
//       case 'rechargeSuccess':
//       case 'feeUseService':
//       case 'drivingIncome':
//         keyStorage = 'messageRevenue';
//         break;
//       case 'requestPictureDriver':
//         keyStorage = 'messageRequestPictureDriver';
//         break;
//       default:
//         keyStorage = 'messageDefault';
//         break;
//     }
//   }
//   storage.setValue(keyStorage, message);
// };

// const handleUpdatePosition = () => {
//   const userToken = storage.getValue('userToken');
//   if (userToken) {
//     getCurrentPosition();
//   }
// };

// // const fullscreenNotification = (_message: FcmMessage) => {
// // if (type === 'driverBooking' || type === 'driverDelivery') {
// //   if (Platform.OS === 'android') {
// //     //   const permission = await checkShowOnLockScreenPermission();
// //     const permission = null;
// //     if (permission || permission == null) {
// //       await notifee.displayNotification({
// //         title:
// //           type === 'driverBooking' ? 'Bạn có cuốc xe mới!' : 'Bạn có chuyến giao hàng mới!',
// //         body: 'Hãy mở ứng dụng để tiếp tục thực hiện.',
// //         android: {
// //           channelId: 'booking_background',
// //           category: AndroidCategory.CALL,
// //           timeoutAfter: 30000,
// //           importance: AndroidImportance.HIGH,
// //           fullScreenAction: {
// //             id: 'default',
// //             launchActivity: 'com.ims.gogo.FullscreenNotificationActivity',
// //           },
// //           actions: [
// //             {
// //               title: 'OK',
// //               pressAction: {
// //                 id: 'accept',
// //                 launchActivity: 'default',
// //               },
// //             },
// //             {
// //               title: 'Bỏ qua',
// //               pressAction: {
// //                 id: 'decline',
// //                 //launchActivity: 'default',
// //               },
// //             },
// //           ],
// //           lightUpScreen: true,
// //           colorized: true,
// //         },
// //       });
// //     }
// //   }
// // }
// // if (Platform.OS === 'android' && remoteMessage) {
// //   // if (DRIVER_NOTIFICATION_STATUS[type]) {
// //   //   NativeModules.BubbleModule.onReceiveNotify(
// //   //     remoteMessage?.notification?.body,
// //   //     'driver',
// //   //   );
// //   // }
// // }
// // };
