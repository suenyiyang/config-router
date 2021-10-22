import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import buble from 'rollup-plugin-buble';
import dts from 'rollup-plugin-dts';
import path from 'path';

const resolve = (...args) => path.resolve(...args);

export default [
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.js',
      format: 'es',
    },
    plugins: [
      typescript(),
      babel({
        exclude: 'node_modules/**',
      }),
      uglify(),
      buble(),
    ],
  },
  {
    input: resolve('src/index.tsx'),
    output: {
      file: 'dist/types/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
