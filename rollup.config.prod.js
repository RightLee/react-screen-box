/*==========引入rollup打包插件(生产配置)==========*/
import path from "path";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';


const inputPath = path.resolve(__dirname, "./src/index.ts");
const outpuUmdtPath = path.resolve(__dirname, "./dist/screen.box.min.js");
const outpuEstPath = path.resolve(__dirname, "./dist/screen.box.es.min.js");


export default {
	input: inputPath,
	output: [
        {
            file: outpuUmdtPath,
            format: "umd",
            name: "screenData",
            globals: {
                react: "React",
                'react-dom': 'ReactDOM',
                'prop-types': 'PropTypes'
            },
        },
        {
            file: outpuEstPath,
            format: "es",
            name: "screenData",
            globals: {
                react: "React",
                'react-dom': 'ReactDOM',
                'prop-types': 'PropTypes'
            },
        }
    ],
	plugins: [
        resolve({ browser: true }),
        babel(),
        commonjs(),
        json(),
        typescript(),
        terser(),
        postcss({
            extract: true, // 独立导出css文件 ，使用组件时需要单独引入
            namedExports: true,
            minimize: true,
            modules: true,
            extensions: [".less", ".css"],
        })
    ],
    external:["react","react-dom"],
}