const router = require('./router');

const metadata = {
  name: 'coffee',
  title: 'Coffee Game',
  description: 'A small coffee shop simulator game with customer and barista characters.',
  version: '0.1.0',
};

module.exports = {
  name: metadata.name,
  router,
  metadata,
};
