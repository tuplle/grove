const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "src", "index.ts"),
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "grove.js",
        path: path.resolve(__dirname, "dist")
    }
};
