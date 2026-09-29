export const JOIN_URL =
  (import.meta.env.VITE_PUBLIC_URL as string | undefined)?.replace(/\/+$/, '') || window.location.origin;

const hostname = new URL(JOIN_URL).hostname;

export const joinUrlReach: 'local' | 'lan' | 'public' =
  hostname === 'localhost' || hostname === '[::1]' || hostname.startsWith('127.')
    ? 'local'
    : /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname)
      ? 'lan'
      : 'public';
