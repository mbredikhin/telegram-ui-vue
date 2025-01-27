import { Telegram } from '@twa-dev/types';
import { canUseDOM } from './dom';

declare global {
  interface Window {
    Telegram?: Telegram;
  }
}

export const getTelegramData = () => {
  if (!canUseDOM) {
    return undefined;
  }

  return window.Telegram?.WebApp;
};
