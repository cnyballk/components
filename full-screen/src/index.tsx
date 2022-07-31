import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import useAutoResize from './useAutoResizeOfDom';

export const ScaleContext = React.createContext({
  scaleX: 1,
  scaleY: 1,
});

export interface fullScreenProps {
  //根元素的引用
  fullScreeRef: React.RefObject<HTMLDivElement>;
  //提供给子组件修改 style 宽高
  setStyle: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}
export interface fullScreenParmas {
  //根元素的 className
  className?: string;
  //设定宽高
  style?: {
    width: number;
    height: number;
  };
  //模式 0:全屏拉满 1:按宽度自适应 2:按高度自适应 3:自动根据宽高适配
  mode?: number;
}

const FULLSCREENWRAPSTYLE: React.CSSProperties = {
  transformOrigin: 'left top',
};
const fullScreen = ({ className, style: wh, mode = 0 }: fullScreenParmas = {}) => {
  return function <T>(WrappedComponent: React.ComponentType<T>): React.FunctionComponent<T> {
    return (props: T) => {
      const { autoWh, domRef } = useAutoResize();
      const [renderWh, setRenderWh] = useState(wh);
      const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
      const [_mode, setMode] = useState(mode);

      useEffect(() => {
        //无style则默认设置内容宽高
        if (!renderWh && (autoWh.width !== 0 || autoWh.height !== 0)) {
          setRenderWh(autoWh);
        }
      }, [autoWh]);

      useLayoutEffect(() => {
        if (!renderWh) {
          return;
        }
        const { width, height } = renderWh;
        const parent = domRef.current.parentNode;
        let scaleX = parent.offsetWidth / width;
        let scaleY = parent.offsetHeight / height;

        if (_mode == 1) {
          scaleY = scaleX;
        }
        if (_mode == 2) {
          scaleX = scaleY;
        }
        if (_mode == 3) {
          const scale = scaleX > scaleY ? scaleY : scaleX;
          scaleX = scale;
          scaleY = scale;
        }
        setScale({ scaleX, scaleY });
      }, [autoWh,renderWh, _mode]);

      //需要传递多层缩放后的值
      const PerentScale = useContext(ScaleContext);
      return (
        <ScaleContext.Provider
          value={{
            scaleX: PerentScale.scaleX * scale.scaleX,
            scaleY: PerentScale.scaleY * scale.scaleY,
          }}
        >
          <div
            className={className}
            style={{
              ...FULLSCREENWRAPSTYLE,
              ...(renderWh as React.CSSProperties),
              transform: `scale(${scale.scaleX},${scale.scaleY})`,
            }}
            ref={domRef}
          >
            <WrappedComponent fullScreeRef={domRef} setStyle={setRenderWh} setMode={setMode} {...props} />
          </div>
        </ScaleContext.Provider>
      );
    };
  };
};

export default fullScreen;

export const Unfull = (props: any) => {
  //反缩放模式
  const scale = useContext(ScaleContext);
  return <div style={{ transform: `scale(${1 / scale.scaleX},${1 / scale.scaleY})` }}>{props.children}</div>;
};
