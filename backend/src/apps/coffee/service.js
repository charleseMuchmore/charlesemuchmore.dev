const MENU = {
  espresso: {
    ingredients: {
      beans: 18,
      cups: 1,
    },
    cost: 1.5,
  },
  latte: {
    ingredients: {
      milk: 150,
      beans: 24,
      cups: 1,
    },
    cost: 2.5,
  },
  cappuccino: {
    ingredients: {
      milk: 100,
      beans: 24,
      cups: 1,
    },
    cost: 3.0,
  },
};

const start = () => {
    return {
        day: 1,
        money: 0,
        inventory: {
            beans: 100,
            milk: 100,
            cups: 25
        },
        currentOrder: null,
        completedOrders: 0
    };
};

const processAction = (gameState, action) => {
    switch (action.type) {
        case "GENERATE_ORDER":
            return generateOrder(gameState);
        case "MAKE_DRINK":
            return makeDrink(gameState, action.drink);
        case "SERVE_DRINK":
            return serveDrink(gameState);
        case "ADVANCE_DAY":
            return advanceDay(gameState);
        case "REFILL":
            return refillInventory(gameState, action.payload);
        default:
            return gameState;
    }
};

const generateOrder = (gameState) => {
    const menuItems = Object.keys(MENU);
    const randomIndex = Math.floor(Math.random() * menuItems.length);
    const randomDrink = menuItems[randomIndex];
    
    return {
        ...gameState,
        currentOrder: randomDrink
    };
};

const makeDrink = (gameState, drinkName) => {
    if (!drinkName || !MENU[drinkName]) {
        return gameState;
    }
    
    const menuItem = MENU[drinkName];
    const ingredients = menuItem.ingredients;
    
    // Check if we have enough ingredients
    for (const ingredient in ingredients) {
        if (!gameState.inventory[ingredient] || gameState.inventory[ingredient] < ingredients[ingredient]) {
            return gameState;
        }
    }
    
    // Consume ingredients
    const newInventory = { ...gameState.inventory };
    for (const ingredient in ingredients) {
        newInventory[ingredient] -= ingredients[ingredient];
    }
    
    return {
        ...gameState,
        inventory: newInventory
    };
};

const serveDrink = (gameState) => {
    if (!gameState.currentOrder) {
        return gameState;
    }
    
    const drink = gameState.currentOrder;
    const menuItem = MENU[drink];
    const cost = menuItem.cost;
    
    return {
        ...gameState,
        money: gameState.money + cost,
        completedOrders: gameState.completedOrders + 1,
        currentOrder: null
    };
};

const advanceDay = (gameState) => {
    return {
        ...gameState,
        day: gameState.day + 1,
        currentOrder: null
    };
};

const refillInventory = (gameState, payload) => {
    const newInventory = { ...gameState.inventory };
    
    if (payload) {
        for (const ingredient in payload) {
            if (newInventory[ingredient] !== undefined) {
                newInventory[ingredient] += payload[ingredient];
            }
        }
    }
    
    return {
        ...gameState,
        inventory: newInventory
    };
};

module.exports = {
    start,
    processAction
};