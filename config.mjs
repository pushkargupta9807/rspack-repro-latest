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
  devtool: "cheap-module-source-map", // "cheap-source-map",
  entry: {
    main:  {
    import: "./src/index.ts",
    runtime: "myRuntime",
  },
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningRspack
      ? path.resolve(__dirname, "rspack-dist")
      : path.resolve(__dirname, "webpack-dist"),
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
        loader: isRunningRspack? "builtin:swc-loader": "swc-loader",
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: "typescript",
            },
            externalHelpers: true,
            transform: {
              react: {
                runtime: "automatic",
                development: true,
              },
            },
          },
        },
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
