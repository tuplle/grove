import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
// import del from 'rollup-plugin-delete';
// import dts from "rollup-plugin-dts";

export default [
	{
		input: 'src/lib/index.ts',
		output: [{
			file: 'dist/grove.esm.js',
			format: 'esm',
			sourcemap: true
		}],
		plugins: [
			typescript({
				tsconfig: 'tsconfig.esm.json'
			}),
			terser()
		]
	},
	{
		input: 'src/lib/index.ts',
		output: {
			file: 'dist/grove.js',
			format: 'cjs',
			sourcemap: true
		},
		plugins: [
			typescript({
				tsconfig: 'tsconfig.json',
			}),
			terser(),
			copy({
				targets: [
					{src: ["./package.json", "./README.md", "./LICENSE"], dest: "./dist"}
				]
			})
		]
	},
	// {
	// 	input: 'dist/dts/index.d.ts',
	// 	output: {
	// 		file: 'dist/grove.d.ts',
	// 		format: 'es'
	// 	},
	// 	plugins: [
	// 		dts(),
	// 		del({
	// 			targets: 'dist/dts',
	// 			hook: 'buildEnd',
	// 			force: true
	// 		})
	// 	]
	// }
]
