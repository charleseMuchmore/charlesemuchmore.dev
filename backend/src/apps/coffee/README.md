# Coffee Shop Game

This folder contains my Coffee Shop Simulator Game.

Structure:
- `index.js` - exports the app router and metadata.
- `router.js` - Express router for app endpoints.
- `controller.js` - request handlers.
- `service.js` - app-specific business logic.
- `validation.js` - request validation middleware.

Routes: 
- `POST /api/apps/coffee/order` - currently places random order
- `POST /api/apps/coffee/make` - attempts to make order and update resources
- `POST /api/apps/coffee/restock` - restocks resources
- `POST /api/apps/coffee/report` - reports resource levels
- `POST /api/apps/coffee/reset` - resets game
