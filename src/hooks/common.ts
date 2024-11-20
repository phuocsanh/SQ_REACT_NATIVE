import {isEqual} from 'lodash';
import {Timeout} from 'models/common';
import {
  DependencyList,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';

const useDeepCompareMemoize = <T>(value: T): T => {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
) => {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

export const useSetAppColorScheme = (scheme: ColorSchemeName = 'light') => {
  useEffect(() => {
    Appearance.setColorScheme(scheme);
  }, [scheme]);
};

export const useDebounce = <T extends string | number | boolean>(
  value: T,
  time = 500,
  clearValue?: T,
) => {
  const [lastValue, setValue] = useState<T>(value);
  const timeout = useRef<Timeout>();

  useEffect(() => {
    if (clearValue !== undefined && clearValue === value) {
      setValue(value);
    } else {
      timeout.current = setTimeout(() => {
        setValue(value);
      }, time);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [value]);

  return lastValue;
};
