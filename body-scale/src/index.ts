import { debounce } from "./utils";
function observerDomResize(dom: HTMLElement, callback: MutationCallback) {
  const MutationObserver = window.MutationObserver;
  const observer = new MutationObserver(callback);
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: true,
  });
  return observer;
}

function useAutoResizeOfDom(domRef: HTMLElement, callback: Function) {
  let state = { width: 0, height: 0 };

  let domObserverRef: any = null;
  let debounceRef: any = null;

  const setDomWH = () => {
    const { clientWidth, clientHeight } = domRef;
    callback({ clientWidth, clientHeight });
  };

  const bindDomResize = () => {
    domObserverRef = observerDomResize(domRef, debounceRef);
    window.addEventListener("resize", debounceRef);
  };

  const unbindDomResize = () => {
    domObserverRef.disconnect();
    domObserverRef.takeRecords();
    domObserverRef = null;
    window.removeEventListener("resize", debounceRef);
  };

  debounceRef = debounce(setDomWH, 100);
  debounceRef();
  bindDomResize();
  return { autoWh: state, domRef, unbindDomResize };
}

interface fullScreenParmas {
  style?: {
    width: number;
    height: number;
  };
  //模式 0:全屏拉满 1:按宽度自适应 2:按高度自适应 3:自动根据宽高适配
  mode?: number;
}

const fullScreen = ({ style, mode = 0 }: fullScreenParmas = {}) => {
  const body = document.querySelector("body") as HTMLBodyElement;
  const parent = body.parentNode as HTMLHtmlElement;
  const s = document.createElement('style');
  s.innerText = `html{ width: 100%;height: 100%;overflow:hidden;}body{transform-origin:left top;overflow:hidden;}`;
  document.head.appendChild(s);
  if (!style) {
    style = {
      width: body.offsetWidth,
      height: body.offsetHeight,
    };
  }
  const { width, height } = style;
  useAutoResizeOfDom(body, (wh: any) => {
    let scaleX = parent.offsetWidth / width;
    let scaleY = parent.offsetHeight / height;
    if (mode == 1) {
      scaleY = scaleX;
    }
    if (mode == 2) {
      scaleX = scaleY;
    }
    if (mode == 3) {
      const scale = scaleX > scaleY ? scaleY : scaleX;
      scaleX = scale;
      scaleY = scale;
    }
    body.style.transform = `scale(${scaleX},${scaleY})`;
  });
};
export default fullScreen;
