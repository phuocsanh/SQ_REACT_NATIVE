import {yupResolver} from '@hookform/resolvers/yup';
import {UseFormProps} from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email không được để trống !')
      .email('Email không đúng định dạng !'),
  })
  .required();

export type TypeRegisterEmail = yup.InferType<typeof schema>;

const formConfig: UseFormProps<TypeRegisterEmail> = {
  resolver: yupResolver(schema),
  defaultValues: {
    email: '',
  },
};

export default formConfig;
