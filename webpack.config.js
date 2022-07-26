const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devPort = parseInt(process.env.port, 10) || 8065;

module.exports = env => {
  const publicPath = "";
  const buildPath = "./build";

  const config = {
    mode: env.prod ? "production" : "development",
    entry: {
      app: path.join(__dirname, "./src/index.jsx"),
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, buildPath),
      port: devPort,
      hot: true,
      disableHostCheck: true,
    },
    output: {
      path: path.join(__dirname, buildPath),
      pathinfo: true,
      filename: env.prod || env.test ? "[name].[hash].js" : "[name].js",
      publicPath: `${publicPath}/`,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /(\.js|\.jsx)$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.ENV": env.dev,
      }),
      new webpack.LoaderOptionsPlugin({ options: {} }),
      new HtmlWebpackPlugin({
        title: "React Redux demo",
        template: path.join(__dirname, "./src/view/index.html"),
        inject: true,
        hash: false,
        filename: "index.html",
        publicPath: "",
      }),
    ],
    devtool: "source-map",
    watch: true,
  };

  return config;
};
