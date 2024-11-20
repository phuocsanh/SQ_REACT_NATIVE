import {AppDispatch, RootState} from './store';

export type DefaultState<D> = {
  data?: D;
  isLoading: boolean;
  error?: any;
};

export const defaultState: DefaultState<any> = {isLoading: false};

export type DefaultLoadmoreState<D> = {
  totalPage: number;
  page: number;
  numshow: number;
  total: number;
  isLoadmore: boolean;
  data?: D[];
  isLoading: boolean;
  error?: any;
};

export const defaultLoadmoreState: DefaultLoadmoreState<any> = {
  totalPage: 0,
  page: 0,
  numshow: 0,
  total: 0,
  isLoading: false,
  isLoadmore: false,
};

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export type AsyncThunkArg<P = void, B = void> = void extends P
  ? void extends B
    ? void
    : {body: B}
  : void extends B
  ? {params: P}
  : {params: P; body: B};
