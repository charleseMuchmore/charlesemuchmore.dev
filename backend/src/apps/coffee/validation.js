exports.validateGameState = (req, res, next) => {
  const { gameState } = req.body;
  if (!gameState || typeof gameState !== 'object') {
    return res.status(400).json({ error: 'Invalid game state.' });
  }
  else if ((gameState.water !== undefined && typeof gameState.water !== 'number') ||
           (gameState.beans !== undefined && typeof gameState.beans !== 'number') ||
           (gameState.milk !== undefined && typeof gameState.milk !== 'number') ||
           (gameState.money !== undefined && typeof gameState.money !== 'number') ||
           (gameState.inventory !== undefined && !Array.isArray(gameState.inventory)) ||
           (gameState.day !== undefined && typeof gameState.day !== 'number') ||
           (gameState.character !== undefined && typeof gameState.character !== 'string')) {
    return res.status(400).json({ error: 'Invalid game state properties.' });
  }
  return next();
};

exports.validateOrder = (req, res, next) => {
  const { order } = req.body;
  if (!order || typeof order !== 'string') {
    return res.status(400).json({ error: 'Invalid order.' });
  }
  return next();
};

