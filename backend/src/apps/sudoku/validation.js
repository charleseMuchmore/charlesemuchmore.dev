exports.validateGeneratePuzzle = (req, res, next) => {
  const { difficulty } = req.body;
  if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty level.' });
  }
  return next();
};

exports.validateSolvePuzzle = (req, res, next) => {
  const { board } = req.body;
  if (!Array.isArray(board) || board.length !== 9) {
    return res.status(400).json({ error: 'Invalid board format.' });
  }
  return next();
};
