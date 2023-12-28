import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/logger.ts',
  output: {
    file: 'dist/logger.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
  ]
};
