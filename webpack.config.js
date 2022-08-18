let path=require('path');
module.exports = {
    entry: "./PureEval.js",
    mode: 'production',
    experiments: {
        outputModule: true,
    }, 
    output: {
        filename: "PureEval.es.min.js",
        path: path.resolve(__dirname, "dist"),
        library: {
            type: "module"
        }
    }
}