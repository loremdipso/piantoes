import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import replace from "@rollup/plugin-replace";
import smelte from 'smelte/rollup-plugin-smelte';
import alias from '@rollup/plugin-alias';
import path from 'path';
import del from 'rollup-plugin-delete';
import { visualizer } from 'rollup-plugin-visualizer';
import dev from 'rollup-plugin-dev';

const production = !process.env.ROLLUP_WATCH;

function getOutputOptions(options) {
	if (!production) {
		// we don't want billions of versions of the same components during dev, so
		// just get rid of the hashing bit
		// TODO: is there a way to get the extension, or will it always be
		options.chunkFileNames = ((chunkInfo) => chunkInfo.name + '.js');
	}
	return options;
}

const config = {
	input: 'src/main.ts',
	output: getOutputOptions({
		name: 'app',
		sourcemap: !production,
		format: 'iife',
		file: 'docs/build/bundle.js'
	}),
	plugins: [
		production && del({ targets: 'docs/build/*' }),

		replace({
			'isDebug': !production,
			preventAssignment: true
		}),

		alias({
			// NOTE: this is a hacky workaround. Svelte doesn't respect typescript's
			// 'paths', so we have to do it here
			entries: [
				{
					find: '@components',
					replacement: path.resolve('src', 'components'),
				},
				{
					find: '@config',
					replacement: path.resolve('src', 'config'),
				},
				{
					find: '@models',
					replacement: path.resolve('src', 'models'),
				},
				{
					find: '@stores',
					replacement: path.resolve('src', 'stores'),
				},
				{
					find: '@utils',
					replacement: path.resolve('src', 'utils'),
				},
			]
		}),

		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),

		scss({
			output: 'docs/build/bundle.css',
			failOnError: true,
			exclude: ['**/global.css', '**/tailwind.css']
		}),

		smelte({
			purge: production,
			output: "docs/global.css", // it defaults to static/global.css which is probably what you expect in Sapper
			postcss: [], // Your PostCSS plugins
			allowlist: [], // Array of classnames whitelisted from purging
			allowlistPatterns: [
				// /dark.bg-/,
				/^bg-/,
			], // Same as above, but list of regexes
			allowlistPatternsChildren: [],
			tailwind: {
				colors: {
					primary: "#018786",
					secondary: "#7141ac",
					error: "#cf6679",
					success: "#4caf50",
					alert: "#ff3f80",
					blue: "#2196f3",
					dark: "#212121"
				}, // Object of colors to generate a palette from, and then all the utility classes
				// darkMode: true,
			},
			// Any other props will be applied on top of default Smelte tailwind.config.js
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// Watch the `docs` directory and refresh the
		// browser on changes when not in production
		!production && livereload('docs'),

		!production && dev({
			spa: true,
			dirs: ['docs'],
			proxy: [
				{
					from: '/api',
					to: 'http://localhost:8089/api'
				},
				{
					from: '/login_api',
					to: 'http://localhost:8089/login_api'
				},
			]
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		production && visualizer(),
	],
	watch: {
		clearScreen: false
	}
};

export default config;