declare module "react"

// 声明HTML元素的类型
declare module 'react' {
    namespace JSX {
      interface IntrinsicElements {
        // 这里添加你需要的HTML元素
        [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      }
    }
}

//声明css的module模块
declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}