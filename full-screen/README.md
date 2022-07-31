# fullScreen

![](https://img.shields.io/npm/v/@cnyballk/full-screen.svg?style=flat-square#id=hdvEz&originHeight=20&originWidth=80&originalType=binary&ratio=1&status=done&style=none)

## 介绍

根据屏幕分辨率与设定好的分辨率进行自适应的 React HOC 组件

## 安装方法

```shell
$ npm install @cnyballk/full-screen --save
or
$ yarn add @cnyballk/full-screen
```

## 使用方法

在组件中引入包

```javascript
import fullScreen from "@cnyballk/full-screen";
```

## 示例

```javascript
import fullScreen from "@cnyballk/full-screen";
const style = {
  width: 1920,
  height: 1080,
};
const PageA = () => {
  return <div></div>;
};
export default fullScreen({ style })(PageA);
```

## 参数

| 参数字段  | 描述                                                                     | 是否必选 | 类型                             | 默认值                   |
| --------- | ------------------------------------------------------------------------ | -------- | -------------------------------- | ------------------------ |
| className | 全屏组件的根容器类名                                                     | 否       | string                           | --                       |
| mode      | 0:全屏拉满 1:按宽度自适应 2:按高度自适应 3:自动根据宽高适配模式 1 或 2。 | 否       | number                           | 0                        |
| style     | 设置缩放分辨率；若传 style 则 style 对象中必须有 width 和 height 属性；  | 否       | `{ width:number height: number}` | 默认设置为内容撑开的宽高 |

## Props

### fullScreeRef

全屏组件的根容器引用

### setStyle

允许重新设置分辨率

#### 使用示例

```typescript
...other code
props.setStyle({
	width:800,
  height:600
})
...other code
```

### setMode

允许重新设置 mode

```typescript
...other code
props.setMode(1)
...other code
```

## Unfull

当父元素使用 fullScreen 的时候，某个子元素想独立出来，可以使用这个组件进行包裹则可以

## 示例

[https://codesandbox.io/s/distracted-field-szxe9](https://codesandbox.io/s/distracted-field-szxe9)
