import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import buble from 'rollup-plugin-buble';

export default {
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
};
