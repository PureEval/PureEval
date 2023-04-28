const esbuild = require('esbuild');

function buildForNode() {
	console.log('Building code for Nodejs...');

	require('esbuild').buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		minify: true,
		platform: 'node',
		external: ['./node_modules/*'],
		outfile: './dist/common/PureEval.common.min.js'
	});
	console.log('\tPureEval.common.min.js -> Done');

	require('esbuild').buildSync({
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

	require('esbuild').buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		minify: true,
		platform: 'neutral',
		external: ['./node_modules/*'],
		outfile: './dist/esm/PureEval.es.min.js'
	});
    console.log('\tPureEval.es.min.js -> Done');

	require('esbuild').buildSync({
		entryPoints: ['PureEval.js'],
		bundle: true,
		platform: 'neutral',
		external: ['./node_modules/*'],
		outfile: './dist/esm/PureEval.es.js'
	});
    console.log('\tPureEval.es.js -> Done');

	console.log('Build for ESM -> Done');
}

function build(){
    buildForNode();
    console.log();
    buildForESM();
}

(function main(){
    console.log('Starting Build for PureEval...\n');
    build();
})();