const service = require('./service');

exports.getInfo = (req, res) => {
  res.json({
    name: 'sudoku',
    description: 'Sudoku game and solver endpoints.',
    routes: [
      { method: 'POST', path: '/apps/sudoku/generate' },
      { method: 'POST', path: '/apps/sudoku/solve' },
    ],
  });
};

exports.generatePuzzle = (req, res) => {
  const difficulty = req.body.difficulty || 'easy';
  const puzzle = service.generatePuzzle(difficulty);
  res.json({ puzzle });
};

exports.solvePuzzle = (req, res) => {
  const { board } = req.body;
  const solution = service.solvePuzzle(board);
  res.json({ solution });
};
