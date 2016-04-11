import babel from 'rollup-plugin-babel';

export default {
  entry: 'dist/index.js',
  format: 'cjs',
  plugins: [ babel() ],
  dest: 'index.js'
};
