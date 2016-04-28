import config from '../../../config/webpack/server.config.js';

const webpack              = require('webpack');
const webpackMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

import path from 'path';

export default function middlewareWebpack(app) {

  const compiler   = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  const hotMiddleware = webpackHotMiddleware(compiler);

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
}
