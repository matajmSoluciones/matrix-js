import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

export default [
    {
        input: "src/index.js",
        output: {
            file: 'dist/matrix.js',
            format: 'umd',
            name: "Matrix",
            exports: 'default'
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    },
    {
        input: "src/index.js",
        output: {
            file: 'dist/matrix.min.js',
            format: 'umd',
            name: "Matrix",
            exports: 'default'
        },
        plugins: [
            resolve(),
            commonjs(),
            uglify()
        ]
    }
];