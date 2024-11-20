import {useAppState} from '@react-native-community/hooks';
import {useEffect} from 'react';
import {getBookingInfo, getNewBookingInfo} from 'redux/booking/asyncThunk';
import {
  setIsChangeRoute,
  setShowDriversReceivedModal,
} from 'redux/booking/slice';
import {getNewDeliveryMultiPointsInfo} from 'redux/deliveryMultipoints/asyncThunk';
import {driverSurplus} from 'redux/driverInfo/asyncThunk';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {getCurrentTrip} from 'redux/other/asyncThunk';
import storage from 'util/storage';
import notifee from '@notifee/react-native';
import {bookingRoom} from 'util/firebase';
import {doNothing} from 'util/helper';
import {countUnreadNotifications} from 'redux/notification/asyncThunk';

export default function useBackgroundMessages() {
  const appState = useAppState();
  const dispatch = useAppDispatch();
  const driverInfo = useAppSelector(state => state.driverInfo.driverInfo.data);

  const driverIsApprove = useAppSelector(
    state => state.driverInfo.driverInfo.data?.is_approve,
  );
  const is_auto_accept_booking = useAppSelector(
    state => state.driverInfo.driverInfo.data?.is_auto_accept_booking,
  );
  const userToken = useAppSelector(state => state.auth.userToken);

  const handleBookingMessage = async () => {
    try {
      const messageBooking = storage.getValue('messageBooking');
      if (messageBooking?.data?._id) {
        const bookingId = messageBooking.data._id;
        const snapshot = await bookingRoom.child(bookingId).once('value');
        if (snapshot.val()?.driverId) {
          if (snapshot.val()?.driverId !== driverInfo?._id) {
            dispatch(setShowDriversReceivedModal(true));
            return storage.delete('messageBooking');
          }
        }
        if (is_auto_accept_booking) {
          dispatch(getCurrentTrip()).then(() => {
            dispatch(getNewBookingInfo(bookingId));
          });
          return storage.delete('messageBooking');
        }
        dispatch(getNewBookingInfo(bookingId))
          .unwrap()
          .then(res => {
            if (
              res.data.info_driver?._id &&
              driverInfo?._id &&
              res.data.info_driver._id !== driverInfo._id
            ) {
              dispatch(setShowDriversReceivedModal(true));
            }
          })
          .catch(() => {
            dispatch(getNewBookingInfo(bookingId))
              .unwrap()
              .then(res => {
                if (
                  res.data.info_driver?._id &&
                  driverInfo?._id &&
                  res.data.info_driver._id !== driverInfo._id
                ) {
                  dispatch(setShowDriversReceivedModal(true));
                }
              });
          });
        if (messageBooking.data.type === 'changeRoute') {
          dispatch(getBookingInfo(bookingId))
            .unwrap()
            .then(() => {
              dispatch(setIsChangeRoute(true));
            });
        }

        storage.delete('messageBooking');
      }
    } catch (error) {
      doNothing(error);
    }
  };

  const handleDeliveryMessage = async () => {
    try {
      const messageDelivery = storage.getValue('messageDelivery');

      if (messageDelivery?.data?._id) {
        const deliveryId = messageDelivery.data._id;

        const snapshot = await bookingRoom.child(deliveryId).once('value');
        if (snapshot.val()?.driverId) {
          if (snapshot.val()?.driverId !== driverInfo?._id) {
            dispatch(setShowDriversReceivedModal(true));

            return storage.delete('messageDelivery');
          }
        }
        if (is_auto_accept_booking) {
          dispatch(getCurrentTrip()).then(() => {
            dispatch(getNewDeliveryMultiPointsInfo(deliveryId));
          });
          return storage.delete('messageDelivery');
        }
        dispatch(getNewDeliveryMultiPointsInfo(deliveryId))
          .unwrap()
          .then(res => {
            if (
              res.data.info_driver?._id &&
              driverInfo?._id &&
              res.data.info_driver._id !== driverInfo._id
            ) {
              dispatch(setShowDriversReceivedModal(true));
            }
          })
          .catch(() => {
            dispatch(getNewDeliveryMultiPointsInfo(deliveryId))
              .unwrap()
              .then(res => {
                if (
                  res.data.info_driver?._id &&
                  driverInfo?._id &&
                  res.data.info_driver._id !== driverInfo._id
                ) {
                  dispatch(setShowDriversReceivedModal(true));
                }
              });
          });
        storage.delete('messageDelivery');
      }
    } catch (error) {
      doNothing(error);
    }
  };

  const handleRevenueMessage = () => {
    try {
      const messageRevenue = storage.getValue('messageRevenue');
      if (messageRevenue?.data?._id) {
        dispatch(driverSurplus());
      }
      storage.delete('messageRevenue');
    } catch (error) {
      doNothing(error);
    }
  };
  const handleMessageTripCancel = () => {
    try {
      const messageTripCancel = storage.getValue('messageTripCancel');

      if (messageTripCancel?.data?._id) {
        notifee.cancelDisplayedNotification(messageTripCancel.data._id);
        dispatch(getCurrentTrip());
      }
      storage.delete('messageTripCancel');
    } catch (error) {
      doNothing(error);
    }
  };

  const handleRequestPictureDriver = () => {
    try {
      const messageRequestPictureDriver = storage.getValue(
        'messageRequestPictureDriver',
      );

      if (messageRequestPictureDriver) {
        dispatch(
          setFcmMessageRequestPictureDriver(messageRequestPictureDriver),
        );
      }
      storage.delete('messageRequestPictureDriver');
    } catch (error) {
      doNothing(error);
    }
  };

  const handleNewNotiMessage = async () => {
    try {
      const messageNewNotification = storage.getValue('newNotification');
      if (messageNewNotification) {
        dispatch(countUnreadNotifications({type: 'approved'}));
      }
      storage.delete('newNotification');
    } catch (error) {
      doNothing(error);
    }
  };
  const handleDefaultMessage = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const messageDefault = storage.getValue('messageDefault');
    } catch (error) {
      doNothing(error);
    }
  };

  useEffect(() => {
    if (appState === 'active' && driverIsApprove === 1) {
      if (userToken) {
        handleNewNotiMessage();
        handleBookingMessage();
        handleDeliveryMessage();
        handleRevenueMessage();
        handleMessageTripCancel();
        handleRequestPictureDriver();
      }
      handleDefaultMessage();
    }
  }, [appState, is_auto_accept_booking]);
}
