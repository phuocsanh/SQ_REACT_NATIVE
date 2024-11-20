// import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {AxiosError} from 'axios';

export type AddressTrip = {
  description: string;
  detail: {
    driver_picture?: string;
    receiver: string;
    warning_reputation: string;
    phone: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    cod?: number;
  };
};

export type DecodePolylineInfo = {
  latitude: number;
  longitude: number;
  fake?: Bool;
};

/**
 * - driver_position: tài xế cập nhật vị trí khi nhận thông báo
 */
export type OtherNotifi =
  | 'sendMessage'
  /** tài xế cập nhật vị trí khi nhận thông báo */
  | 'driverPosition'
  /** Nhắc nhở tài xế mở app */
  | 'remindDriverOnline';

/**
 * - driverBooking: Tài xế có chuyến
 * - customerCancel: Khách hàng hủy chuyến
 */
export type DriverNotificationBooking =
  | 'changeRoute'
  | 'driverBooking'
  | 'customerCancelBooking'
  | 'adminCancel'
  | 'tippingDriver';

/**
 * - driverDelivery: Tài xế có chuyến giao hàng
 * - customerCancel: Khách hàng hủy chuyến
 */
export type DriverNotificationDelivery =
  | 'driverDelivery'
  | 'customerCancelDelivery'
  | 'adminCancel';

/**
 * - registrationApproved: Duyệt tài xế
 * - driverLocked: Khoá tài khoản
 * - newNotification: Thông báo mới của tài xế
 * - type_noti: Thông báo chưa đăng nhập
 * - registerStep: Thông báo duyệt lại thông tin
 * - approvalDriverDistanceReport : Duyệt báo cáo tài xế
 * - approvalDriverDistance : Duyệt nhận thưởng
 * - requestPictureDriver : Xác minh hình ảnh
 */
export type DriverInfo =
  | 'registrationApproved'
  | 'driverLocked'
  | 'newNotification'
  | 'reapproveStepDriver'
  | 'type_noti'
  | 'registerStep'
  | 'approvalDriverDistanceReport'
  | 'approvalDriverDistance'
  | 'requestPictureDriver';

export type TypeNotificationRole =
  | 'all'
  | 'approved'
  | 'pending'
  | 'no_login'
  | 'first_deposit';

/**

/** booking: Đặt xe, delivery: Giao hàng */
export const enum TypeOfTrip {
  booking = 'booking',
  delivery = 'delivery',
}

// export type FcmMessage = Omit<FirebaseMessagingTypes.RemoteMessage, 'data'> & {
//   data?: {
//     _id: string;
//     type:
//       | DriverNotificationBooking
//       | DriverNotificationDelivery
//       | DriverInfo
//       | OtherNotifi;
//     type_noti?: TypeNotificationRole;
//     type_booking?: TypeOfTrip;
//     show_on_foreground?: '1' | '0';
//     /**
//      *  Tên người gửi tin nhắn dành cho type = sendMessage
//      */
//     sender?: string;
//   };
// };

/**
 * approve = 1,
 * unApprove = 2
 */
export const enum ApproveStatus {
  approve = 1,
  unApprove,
}

/**
 * offline = 0,
 * online = 1
 */
export const enum ActiveStatus {
  offline,
  online,
}

/**
 * off= 0,
 * on = 1
 */
export const enum AutoAcceptStatus {
  off,
  on,
}
//todo Nhật sẽ sửa sau
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = {[key: string]: any};

export type ApiResponse = {
  code: number;
  message: string;
};

export const isApiResponse = (err: unknown): err is ApiResponse => {
  if (err && typeof err === 'object' && 'code' in err && 'message' in err) {
    return true;
  }
  return false;
};

export type ErrorConfirmBooking = {
  code: number;
  message: {
    error_code?: number;
    mess?: string;
  };
};

export const isErrorConfirmBooking = (
  err: unknown,
): err is ErrorConfirmBooking => {
  if (
    err &&
    typeof err === 'object' &&
    'code' in err &&
    'message' in err &&
    err.message &&
    typeof err.message === 'object' &&
    'error_code' in err.message
  ) {
    return true;
  }
  return false;
};
export type ResponseData<D> = ApiResponse & {
  data: D;
};

export type AppAxiosError = AxiosError<
  ApiResponse & {
    data?: AnyObject;
  }
>;

type Paging = {
  p?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void
  ? Paging | void
  : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  total_pages: number;
  total: number;
  per_page: number;
  current_page: number;
  data: D[];
  //from:number;
  //to:number;
};

export type Timeout = ReturnType<typeof setTimeout>;

export type Interval = ReturnType<typeof setInterval>;

export type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

export const enum Gender {
  FEMALE,
  MALE,
}

export const enum NameAction {
  bike = 'bike',
  car = 'car',
}

export const enum Bool {
  NO,
  YES,
}
