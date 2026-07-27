const service = require('./service');

exports.getInfo = (req, res) => {
  res.json({
    name: 'coffee',
    description: 'Coffee shop game endpoints.',
    routes: [
      { method: 'POST', path: '/apps/coffee/order' },
      { method: 'POST', path: '/apps/coffee/make' },
      { method: 'POST', path: '/apps/coffee/restock' },
      { method: 'POST', path: '/apps/coffee/report' },
      { method: 'POST', path: '/apps/coffee/reset' },
    ],
  });
};

exports.order = (req, res) => {
  const { gameState } = req.body;
  const result = service.order(gameState);
  res.json(result);
};

exports.make = (req, res) => {
  const { gameState, order } = req.body;
  const result = service.make(gameState, order);
  res.json(result);
};

exports.restock = (req, res) => {
  const { gameState } = req.body;
  const result = service.restock(gameState);
  res.json(result);
};

exports.report = (req, res) => {
  const { gameState } = req.body;
  const result = service.report(gameState);
  res.json(result);
};

exports.reset = (req, res) => {
  const result = service.resetGame();
  res.json(result);
};
