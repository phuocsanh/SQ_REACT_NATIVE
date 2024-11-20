import {createMutationHook, createQueryHook} from 'redux/helper';
import {
  checkPhone,
  deleteAccount,
  listVehicle,
  loginDriver,
  logoutDriver,
  registerAccount,
  resetPassword,
  sendOtp,
  verifyOtp,
} from './asyncThunk';

export const useDeleteAccount = createMutationHook(deleteAccount);

export const useLogout = createMutationHook(logoutDriver);

export const useCheckPhone = createQueryHook(checkPhone);

export const useLoginDriver = createMutationHook(loginDriver);

export const useSendOtp = createQueryHook(sendOtp);

export const useVerifyOtp = createMutationHook(verifyOtp);

export const useListVehicle = createQueryHook(listVehicle);

export const useRegisterAccount = createMutationHook(registerAccount);

export const useResetPassword = createMutationHook(resetPassword);
