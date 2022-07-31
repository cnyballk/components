import { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from './utils';
export function observerDomResize(dom: HTMLElement, callback: MutationCallback) {
  const MutationObserver = window.MutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  });
  return observer;
}

export default function useAutoResizeOfDom() {
  const [state, setState] = useState({ width: 0, height: 0 });

  const domRef: React.MutableRefObject<any> = useRef(null);
  const domObserverRef: React.MutableRefObject<any> = useRef(null);
  const debounceRef: React.MutableRefObject<any> = useRef(null);

  const setDomWH = useCallback(() => {
    const { clientWidth, clientHeight } = domRef.current;
    setState({ width: clientWidth, height: clientHeight });
  }, []);

  const bindDomResize = useCallback(() => {
    domObserverRef.current = observerDomResize(domRef.current, debounceRef.current);
    window.addEventListener("resize", debounceRef.current);
  }, []);

  const unbindDomResize = useCallback(() => {
    const { current: domObserver } = domObserverRef;
    domObserver.disconnect();
    domObserver.takeRecords();
    domObserverRef.current = null;
    window.removeEventListener("resize", debounceRef.current);
  }, []);

  useEffect(() => {
    debounceRef.current = debounce(setDomWH, 100);
    debounceRef.current();
    bindDomResize();
    return unbindDomResize;
  }, []);

  return { autoWh: state, domRef, setStyle: setState };
}
