import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.ts",
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        // loader: "builtin:swc-loader",
        // options: {
        //   sourceMap: true,
        //   jsc: {
        //     parser: {
        //       syntax: "typescript",
        //     },
        //     externalHelpers: true,
        //     transform: {
        //       react: {
        //         runtime: "automatic",
        //         development: true,
        //       },
        //     },
        //   },
        // },
        loader: "@graphitation/embedded-document-artefact-loader/webpack"
      },
    ],
  },
  resolve:
  {
    alias: {
      htmlparser2: path.resolve( __dirname,
        "node_modules/htmlparser2"
      ),
    }
  }
};

export default config;
