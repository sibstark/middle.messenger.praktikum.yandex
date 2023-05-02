// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const ESLintPlugin = require("eslint-webpack-plugin");

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
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      "@types": path.resolve(__dirname, "/src/types"),
      "@utils": path.resolve(__dirname, "/src/utils"),
      "@controllers": path.resolve(__dirname, "/src/controllers"),
      "@components": path.resolve(__dirname, "/src/components"),
      "@components/*": path.resolve(__dirname, "/src/components/*"),
      "@modules": path.resolve(__dirname, "/src/modules"),
      "@pages": path.resolve(__dirname, "/src/pages"),
      "@hocs": path.resolve(__dirname, "/src/hocs"),
      "@api": path.resolve(__dirname, "/src/api"),
      "@connectors": path.resolve(__dirname, "/src/connectors"),
      "@routes": path.resolve(__dirname, "/src/pages/routes.ts"),
      handlebars: "handlebars/dist/handlebars.min.js"
    }
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
        test: /\.(woff(2)?|eot|ttf|otf|svg|png|jpg|)$/,
        type: "asset/inline"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.hbs$/, // Apply the loader only to .hbs files
        use: [
          {
            loader: path.resolve(__dirname, "inline-loader.js") // Path to the loader
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      hash: isProd
    }),
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port,
    open: true,
    host: "localhost"
  }
};
