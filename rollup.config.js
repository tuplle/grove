import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
    {
        input: 'src/index.ts',
        output: [{
            file: 'dist/grove.esm.js',
            format: 'es',
            sourcemap: true
        }],
        plugins: [
            typescript(), // Add TypeScript plugin
            terser()
        ]
    },
    {
        input: 'src/index.ts',
        output: [{
            file: 'dist/grove.js',
            format: 'cjs',
            sourcemap: true
        }],
        plugins: [
            typescript(), // Add TypeScript plugin
            terser()
        ]
    }
];
