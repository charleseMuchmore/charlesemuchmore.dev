const service = require('./service');

exports.start = (req, res) => {
    const gameState = service.start();

    res.json({
        gameState
    });

};

exports.action = (req, res) => {
    const { gameState, action } = req.body;
    const updatedState = service.processAction(gameState, action);

    res.json({
        gameState: updatedState
    });

};