import moment from 'moment';
import {useCallback, useEffect, useRef, useState} from 'react';

const now = () => moment().unix();

type CountdownConfig = {
  /**
   * isSync = true sẽ cho phép đếm ngược đúng theo thời gian thực, không bị ảnh hưởng khi ẩn app xuống nền
   * @default true
   */
  isSync?: boolean;
  /**
   * Đếm ngược tới số âm sau khi về 0
   * @default false
   */
  countNegative?: boolean;
  /**
   * Unix timestamp thay vì số giây
   * @default false
   */
  isTimestamp?: boolean;
  /**
   * Tạm dừng đếm ngược khi bắt đầu cho đến khi reset hoặc resume
   * @default false
   */
  pauseOnMount?: boolean;
};

export const useCountdown = (seconds: number, config?: CountdownConfig) => {
  const {
    isTimestamp = false,
    countNegative = false,
    isSync = true,
    pauseOnMount = false,
  } = config || {};
  const [remainTime, setRemainTime] = useState(() => {
    const remain = isTimestamp ? seconds - now() : seconds;
    return remain < 0 && !countNegative ? 0 : remain;
  });
  const [isPaused, setIsPaused] = useState(pauseOnMount);
  const timeToZero = useRef(isTimestamp ? seconds : seconds + now());
  if (isTimestamp) {
    timeToZero.current = seconds;
  }
  const currentTime = useRef(now());
  const isMount = useRef(true);

  const decreaseTime = useCallback(() => {
    if (isSync) {
      currentTime.current = now();
      const remain = timeToZero.current - currentTime.current;
      setRemainTime(remain < 0 && !countNegative ? 0 : remain);
    } else {
      setRemainTime(t => (countNegative || t > 1 ? t - 1 : 0));
    }
  }, [countNegative, isSync]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        decreaseTime();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPaused, decreaseTime]);

  const resetCountdown = useCallback(() => {
    if (!isTimestamp) {
      timeToZero.current = seconds + now();
      setRemainTime(seconds);
    }
    setIsPaused(false);
  }, [isTimestamp, seconds]);

  useEffect(() => {
    if (!isMount.current || !pauseOnMount) {
      resetCountdown();
    }
    isMount.current = false;
  }, [isTimestamp, seconds]);

  const stopCountdown = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeCountdown = useCallback(() => {
    if (isPaused) {
      if (isSync && !isTimestamp) {
        timeToZero.current = now() + remainTime;
      }
      decreaseTime();
      setIsPaused(false);
    }
  }, [decreaseTime, isSync, isTimestamp, remainTime, isPaused]);

  return {remainTime, stopCountdown, resumeCountdown, resetCountdown};
};
