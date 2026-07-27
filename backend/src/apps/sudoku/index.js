const router = require('./router');

const metadata = {
  name: 'sudoku',
  title: 'Sudoku',
  description: 'A small Sudoku puzzle app with generator and solver endpoints.',
  version: '0.1.0',
};

module.exports = {
  name: metadata.name,
  router,
  metadata,
};
