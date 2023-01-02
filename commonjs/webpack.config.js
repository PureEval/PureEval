const path=require('path');
module.exports = {
    entry: './PureEval.js',
    mode:'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'PureEval.common.min.js',
        library: {
            type: 'commonjs',
        },
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
    devtool: false,
}; 
