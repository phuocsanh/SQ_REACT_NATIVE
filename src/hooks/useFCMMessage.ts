import {FcmMessage} from 'models';
import {useEffect, useRef, useState} from 'react';
import {useAppSelector} from 'redux/hooks';

export default function useFCMMessage() {
  const [message, setMessage] = useState<FcmMessage | null>(null);

  const fcmMessage = useAppSelector(state => state.other.fcmMessage);

  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      setMessage(fcmMessage);
    }
  }, [fcmMessage?.messageId]);

  return message;
}
