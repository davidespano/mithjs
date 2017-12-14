module.exports = [
    {
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        entry: {
            main: './src/index.js',
            /*todomvc: './src/examples/todomvc/src/index.js'*/
        }
    },
    {
        module: {
            loaders: [
                {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
            ]
        },
        entry: {

            todomvc: './src/examples/todomvc/src/index.js'
        }
    }
];
