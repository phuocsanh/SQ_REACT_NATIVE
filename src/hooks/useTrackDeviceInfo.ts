// import {useEffect, useState} from 'react';
// import {BUILD_VERSION} from 'util/constant';
// import {useFCMToken} from './useFCMToken';
// import {
//   getBrand,
//   getDeviceId,
//   getModel,
//   getSystemVersion,
//   getVersion,
// } from 'react-native-device-info';
// import {deviceInfo} from 'util/firebase';
// import {useAppSelector} from 'redux/hooks';
// import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import {checkIgnoreBatteryOptimize} from 'react-native-custom-native';

// export function useTrackDeviceInfo() {
//   const phone = useAppSelector(state => state.driverInfo.driverInfo?.data?.phone);
//   const deviceIp = useAppSelector(state => state.other.deviceIp);
//   const deviceToken = useFCMToken();
//   const [firebaseUser, setUser] = useState<FirebaseAuthTypes.User | null>(null);

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(setUser);
//     return subscriber;
//   }, []);

//   useEffect(() => {
//     if (phone && firebaseUser) {
//       (async () => {
//         try {
//           const model = getModel();
//           const brand = getBrand();
//           const deviceId = getDeviceId();
//           const version = `${getVersion()}.${BUILD_VERSION}`;
//           const systemVersion = getSystemVersion();
//           const isIgnoreBatterySaver = await checkIgnoreBatteryOptimize();
//           await deviceInfo.child(`${phone}/driver/${deviceId}`).set({
//             deviceIp,
//             version,
//             brand,
//             model,
//             deviceToken,
//             systemVersion,
//             date: new Date().toString(),
//             isIgnoreBatterySaver,
//           });
//         } catch (error) {}
//       })();
//     }
//   }, [phone, deviceToken, deviceIp, firebaseUser]);
// }
