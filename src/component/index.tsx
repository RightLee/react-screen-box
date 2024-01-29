import React, { FC, useRef, useEffect, ReactNode, useState } from 'react'
import styled from 'styled-components'

//样式
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
  border: 1px solid red;
  box-sizing: border-box;
`
export interface ReactScreenBoxProps {
  children?: ReactNode;
  width?: number,
  height?: number,
  onComplete?: (data: any) => void,
}

type AsyncFunction = () => Promise<void>

const ReactScreenBox:FC<ReactScreenBoxProps> = (props: ReactScreenBoxProps) => {
  //组件参数
  const screenBoxRef = useRef<HTMLDivElement>(null)
  let setWidth:number = 0
  let setHeight:number = 0
  let originalWidth:number = 0
  let originalHeight:number = 0
  let observer:MutationObserver | null = null
  const [ready, setReady] = useState< boolean >(false)

  useEffect(()=>{
    //组件初始挂载事件和初始化工作
    initData()
    return () => {
      //组件卸载时清理
      destroyData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //初始化数据
  const initData: AsyncFunction = async () => {
    setReady(false)
    await initSize()
    updateSize()
    updateScale()
    //防抖监听视图变化、执行回调
    window.addEventListener("resize", debounce(300, onResize));
    setReady(true)
    initMutationObserver()
    props.onComplete && props.onComplete({ type:'complete' })
  }

  //初始化尺寸
  const initSize : AsyncFunction = () => {
    return new Promise( resolve => {
      //获取大屏的真实尺寸
      setWidth = props.width ?? 1920
      setHeight = props.height ?? 1080
      //获取大屏画布尺寸
      originalWidth = originalWidth || screen.width
      originalHeight = originalHeight || screen.width
      resolve()
    })
  }

  //更新尺寸
  const updateSize = () :void => {
    if(screenBoxRef.current && setWidth && setHeight){
      screenBoxRef.current.style.width = `${ setWidth }px` 
      screenBoxRef.current.style.height = `${ setHeight }px` 
    }
  }

  //更新缩放
  const updateScale = () :void => {
    //获取真实的视口尺寸
    const currentWidth = document.body.clientWidth
    const currentHeight = document.body.clientHeight
    //获取大屏最终的尺寸
    const realWidth = setWidth || originalWidth
    const realHeight = setHeight || originalHeight
    const widthScale = currentWidth / realWidth
    const heightScale = currentHeight / realHeight
    if(screenBoxRef.current){
      screenBoxRef.current.style.transform = `scale(${ widthScale },${ heightScale })`
    }
  }

  //监听尺寸的回调函数(初始化尺寸, 更新缩放)
  const onResize = async () => {
    await initSize();
    updateScale();
  }

  //防抖方法(默认延时0.5s)
  const debounce = (delay:number = 1000, callback: Function) =>{
    let task: NodeJS.Timeout
    return function (...rest: any[]){
        clearTimeout(task)
        task = setTimeout(() => {
            callback(...rest)
            props.onComplete && props.onComplete({ type:'complete' })
        }, delay);
    }
  }

  //浏览器监听dom元素
  const initMutationObserver = () => {
    const MutationObserver = window.MutationObserver;
    observer = new MutationObserver(onResize)
    if(screenBoxRef.current){
      observer.observe(screenBoxRef.current, {
        attributes: true,
        attributeFilter: ["style"],
        attributeOldValue: true,
      })
    }
  }

  //浏览器移除监听dom元素
  const removeMutationObserver = () => {
    if(observer){
      observer.disconnect();
    }
  }

  const destroyData = () => {
    //防抖监听视图变化、执行回调
    window.addEventListener("resize", onResize);
    removeMutationObserver()
  }


  return (
    <Container ref={screenBoxRef}>
      { ready ? props.children : <></> }
    </Container>
  )
}

export default ReactScreenBox
