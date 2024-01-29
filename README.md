###  一个react的全屏组件  
#### A full screen component of react

页面锁屏，放大和缩小浏览器，屏幕比例保持不变

```js
function App() {
  const width:number = 1920
  const height:number = 1080

  //完成回调
  const handleComplete = (data: any) => {
    console.log(data)
  }
  return (
      <ReactScreenBox width={width} height={height} onComplete={handleComplete}>
        <div>aaaa</div>
      </ReactScreenBox>
  )
}
```


###### Installation
```js
npm install react-screen-box
```

引入
```js
import ReactScreenBox from 'react-screen-box'
```

页面使用组件
```js
<ReactScreenBox>
   //页面具体内容
</ReactScreenBox>
```

尺寸默认`1920x1080`：
```js
function App() {
  //完成回调
  const handleComplete = (data: any) => {
    console.log(data)
  }
  return (
      <ReactScreenBox onComplete={handleComplete}>
        <div>aaaa</div>
      </ReactScreenBox>
  )
}
```

可配置固定尺寸，配置方法如下:
```js
function App() {
  const width:number = 3840
  const height:number = 2160

  //完成回调
  const handleComplete = (data: any) => {
    console.log(data)
  }
  return (
      <ReactScreenBox width={width} height={height} onComplete={handleComplete}>
        //嵌套组件内容
      </ReactScreenBox>
  )
}
```

###### MIT Licenced