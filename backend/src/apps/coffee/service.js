const validation = require('./validation');

const MENU = {
  espresso: {
    ingredients: {
      water: 50,
      beans: 18,
    },
    cost: 1.5,
  },
  latte: {
    ingredients: {
      water: 200,
      milk: 150,
      beans: 24,
    },
    cost: 2.5,
  },
  cappuccino: {
    ingredients: {
      water: 250,
      milk: 100,
      beans: 24,
    },
    cost: 3.0,
  },
};

function resetGame() {
  return {
    message: 'Game reset successfully.',
    state: {
      water: 500,
      beans: 250,
      milk: 400,
      money: 0,
      inventory: [],
      day: 1,
      character: 'barista',
    },
  };
}

function order(gameState) {
  validation.validateGameState({ body: { gameState } }, {}, () => {});
  const menuItems = Object.keys(MENU);
  const randomIndex = Math.floor(Math.random() * menuItems.length);
  const randomDrink = menuItems[randomIndex];
  return {
    order: randomDrink,
  };
}

function make(gameState, orderName) {
  validation.validateGameState({ body: { gameState } }, {}, () => {});
  validation.validateOrder({ body: { order: orderName } }, {}, () => {});

  const menuItem = MENU[orderName];
  if (!menuItem) {
    return { error: `Unknown order: ${orderName}.` };
  }

  for (const ingredient in menuItem.ingredients) {
    if (gameState[ingredient] >= menuItem.ingredients[ingredient]) {
      gameState[ingredient] -= menuItem.ingredients[ingredient];
    } else {
      return { error: `Not enough ${ingredient} to make this drink.` };
    }
  }

  gameState.money += menuItem.cost;

  return {
    message: `The ${orderName} is ready.`,
    state: gameState,
  };
}

function restock(gameState) {
  validation.validateGameState({ body: { gameState } }, {}, () => {});

  gameState.water += 500;
  gameState.beans += 100;
  gameState.milk += 200;

  return {
    message: 'Successfully restocked ingredients.',
    state: gameState,
  };
}

function quit() {
  const newState = resetGame().state;
  return {
    message: 'Bye.',
    state: newState,
  };
}

function report(gameState) {
  validation.validateGameState({ body: { gameState } }, {}, () => {});
  return { gameState };
}

function advanceDay(gameState) {
  validation.validateGameState({ body: { gameState } }, {}, () => {});
  return {
    message: 'This is a stub advanceDay function. Replace with real coffee advanceDay logic.',
  };
}

module.exports = {
  resetGame,
  order,
  make,
  restock,
  quit,
  report,
  advanceDay,
};
