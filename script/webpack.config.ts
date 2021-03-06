import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { Configuration, Stats, DefinePlugin } from 'webpack';
import  HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import { red, green } from 'chalk';
import { resolveRoot } from './utils';

export const config = (
  env: typeof process.env.NODE_ENV,
  proc: 'main' | 'render',
) => {
  const isdev = env === 'development';
  const isprod = env === 'production';
  const ismain = proc === 'main';
  const isrender = proc === 'render';

  const conf: Configuration = {
    mode: isdev ? 'development' : 'production',
    devtool: isdev ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
    target: ismain ? 'electron-main' : 'electron-renderer',
    entry: resolveRoot(ismain ? 'src/main/index.ts' : 'src/render/main.ts'),
    output: {
      path: resolveRoot('dist', proc),
      filename: ismain ? '_.js' : '[name].[contenthash:9].js',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-typescript',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-transform-typescript', { isTSX: true }],
              '@vue/babel-plugin-jsx',
              [
                'import',
                {
                  libraryName: 'ant-design-vue',
                  libraryDirectory: 'es',
                  style: 'css',
                },
              ],
            ],
          },
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          // loader: join(__dirname, 'vue-loader.js'),
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|svg|ttf|eot)$/i,
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  javascriptEnabled: true,
                },
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: resolve(
                  __dirname,
                  '../src/render/styles/_handle.scss',
                ),
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.json', '.js'],
      alias: {
        '@': resolveRoot('src/render'), // ??? render -> vue ???
        '@src': resolveRoot('src'),
        '@root': resolveRoot(),
      },
      fallback: {
        path: false,
      },
    },
    plugins: isrender
      ? [
          new HtmlWebpackPlugin({
            templateContent: () => {
              const html = readFileSync(
                resolveRoot('src/render/index.html'),
                'utf8',
              );
              return html
                .split('\n')
                .filter((line) => !line.includes('/main.ts')) // ?????? vite ????????? script
                .join('\n');
            },
          }),
          new DefinePlugin({
            // https://github.com/vuejs/vue-next/blob/master/packages/vue/README.md#bundler-build-feature-flags
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
          }),
          // https://vue-loader.vuejs.org/zh/guide/
          // ??????????????????????????????
          new VueLoaderPlugin(),
        ]
      : [],
  };
  return conf;
};

const now = () => new Date().toLocaleString();
export function compileHandle(tag = '', cb = (bool: boolean) => {}) {
  return function (err?: Error, stats?: Stats) {
    if (err) {
      console.log(red(tag), 'webpack ????????????', now());
      console.log(err, '\n');
      cb(false);
    } else if (stats?.hasErrors()) {
      console.log(red(tag), 'webpack ????????????', now());
      console.log(
        stats
          ?.toJson()
          ?.errors?.map((e) => e.message)
          ?.join('\n'),
        '\n',
      );
      cb(false);
    } else {
      console.log(green(tag), 'webpack ????????????', now());
      cb(true);
    }
  };
}
