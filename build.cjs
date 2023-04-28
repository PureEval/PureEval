// main
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

function clean() {
	console.log('Cleaning cache...');
	
    rmdirSync('./dist');
	console.log('\tRemove dist -> Done');

    console.log("Clean cache -> Done\n");
}

function buildForNode() {
	console.log('Building code for Nodejs...');

	esbuild.buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		minify: true,
		platform: 'node',
		external: ['./node_modules/*'],
		outfile: './dist/common/PureEval.common.min.js'
	});
	console.log('\tPureEval.common.min.js -> Done');

	esbuild.buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		platform: 'node',
		external: ['./node_modules/*'],
		outfile: './dist/common/PureEval.common.js'
	});
	console.log('\tPureEval.common.js -> Done');

	console.log('Build for Nodejs -> Done');
}

function buildForESM() {
	console.log('Building code for ESM...');

	esbuild.buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		minify: true,
		platform: 'neutral',
		external: ['./node_modules/*'],
		outfile: './dist/esm/PureEval.es.min.js'
	});
	console.log('\tPureEval.es.min.js -> Done');

	esbuild.buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		platform: 'neutral',
		external: ['./node_modules/*'],
		outfile: './dist/esm/PureEval.es.js'
	});
	console.log('\tPureEval.es.js -> Done');

	console.log('Build for ESM -> Done');
}

function build() {
	buildForNode();
	console.log();
	buildForESM();
}

(function main() {
	console.log('Starting Build for PureEval...\n');
	clean();
	build();
})();

// utils
function rmdirSync(dirpath) {
	if (fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory()) {
		var files = fs.readdirSync(dirpath);
		files.forEach(function (file, index) {
			var curPath = path.join(dirpath, file);
			if (fs.statSync(curPath).isDirectory()) {
				rmdirSync(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(dirpath);
	}
}
