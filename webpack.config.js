// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const port = process.env.PORT || 3000;

module.exports = {
  mode: isProd ? "production" : "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json")
            }
          }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      hash: config.__PROD__
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port,
    proxy: [
      {
        context: ["/proxy-api/**"],
        target: "https://proxy-api/api/",
        pathRewrite: { "^/api/": "/" },
        secure: false,
        onProxyReq: proxyReq => {
          proxyReq.setHeader("Host", "my-custom-host");
        }
      }
    ],
    open: true,
    watch: true,
    hot: true
  }
};
