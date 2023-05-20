// main
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const chalk = require('chalk');

function clean() {
	console.log(chalk.yellow('Cleaning cache...'));
	rmdirSync('./dist');
	console.log(chalk.green('\tRemove dist -> Done'));
	console.log(chalk.yellow("Clean cache -> Done\n"));
}

function buildForNode() {
	console.log(chalk.yellow('Building code for Nodejs...'));

	const nodeBuildOptions = {
		entryPoints: ['PureEval.js'],
		bundle: true,
		platform: 'node',
		external: ['./node_modules/*'],
	};

	esbuild.buildSync({
		...nodeBuildOptions,
		minify: true,
		outfile: './dist/common/PureEval.common.min.js'
	});
	console.log(chalk.green('\tPureEval.common.min.js -> Done'));

	esbuild.buildSync({
		...nodeBuildOptions,
		outfile: './dist/common/PureEval.common.js'
	});
	console.log(chalk.green('\tPureEval.common.js -> Done'));

	console.log(chalk.yellow('Build for Nodejs -> Done'));
}

function buildForESM() {
	console.log(chalk.yellow('Building code for ESM...'));

	const esmBuildOptions = {
		entryPoints: ['PureEval.js'],
		bundle: true,
		platform: 'neutral',
		external: ['./node_modules/*'],
	};

	esbuild.buildSync({
		...esmBuildOptions,
		minify: true,
		outfile: './dist/esm/PureEval.es.min.js'
	});
	console.log(chalk.green('\tPureEval.es.min.js -> Done'));

	esbuild.buildSync({
		...esmBuildOptions,
		outfile: './dist/esm/PureEval.es.js'
	});
	console.log(chalk.green('\tPureEval.es.js -> Done'));

	console.log(chalk.yellow('Build for ESM -> Done'));
}

function build() {
	buildForNode();
	console.log();
	buildForESM();
}

(function main() {
	console.log(chalk.blue('Starting Build for PureEval...\n'));
	clean();
	build();
	console.log(chalk.blue('Build Completed!'));
})();

// utils
function rmdirSync(dirpath) {
	if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
		fs.readdirSync(dirpath).forEach(function (file) {
			const curPath = path.join(dirpath, file);
			if (fs.statSync(curPath).isDirectory()) {
				rmdirSync(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dirpath);
	}
}

