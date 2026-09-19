import { useEffect, useState } from 'react';
export function useOffline() {
 const [online,setOnline] = useState(navigator.onLine);
 const [ready,setReady] = useState(false);
 useEffect(() => {
  const update = () => setOnline(navigator.onLine);
  window.addEventListener('online',update); window.addEventListener('offline',update);
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
   navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(() => setReady(true)).catch(error => console.warn('No se pudo preparar el modo offline',error));
  }
  return () => {window.removeEventListener('online',update);window.removeEventListener('offline',update);};
 },[]);
 return {online,ready};
}
