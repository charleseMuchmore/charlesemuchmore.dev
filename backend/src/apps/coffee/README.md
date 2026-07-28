# Coffee Shop Game Refactor

Refactor the Coffee Shop Simulator backend to use a standardized application interface that matches the architecture of all backend mini-apps.

## Goals

Do **not** rewrite or replace the existing game logic. Preserve the current behavior wherever possible.

The goal is to change the HTTP interface and internal organization so that every app exposes the same public API.

---

## New Public API

Replace all app-specific endpoints with the following two endpoints only:

```
POST /api/apps/coffee/start
POST /api/apps/coffee/action
```

Remove the following routes:

```
POST /api/apps/coffee/order
POST /api/apps/coffee/make
POST /api/apps/coffee/restock
POST /api/apps/coffee/report
POST /api/apps/coffee/reset
```

---

## start endpoint

`POST /start`

Returns a brand-new initial game state.

The backend should **not** store any game state.

The response should look like:

```json
{
  "gameState": { ... }
}
```

The frontend is responsible for storing this object in React state.

---

## action endpoint

`POST /action`

Request body:

```json
{
  "gameState": { ... },
  "action": {
    "type": "...",
    "payload": { }
  }
}
```

The backend should:

1. Validate the request.
2. Pass `gameState` and `action` into the game service.
3. Return the updated game state.

Response:

```json
{
  "gameState": { ... }
}
```

The backend should never persist state between requests.

---

## Service responsibilities

The service should expose only two public functions:

```javascript
start()

processAction(gameState, action)
```

`start()` returns a fresh initial game state.

`processAction()` receives the current game state and a single action object and returns a new game state.

Do not pass Express request or response objects into the service.

---

## Internal organization

Existing functions such as:

* generate order
* make drink
* restock inventory
* generate report
* reset game

should become private helper functions inside the service.

`processAction()` should dispatch to those helper functions based on `action.type`.

Example:

```javascript
switch (action.type) {
    case "GENERATE_ORDER":
        ...
    case "MAKE_DRINK":
        ...
    case "RESTOCK":
        ...
    case "REPORT":
        ...
}
```

or an equivalent handler map if appropriate.

---

## State management

The backend must remain completely stateless.

Do not use:

* databases
* in-memory session storage
* caches
* global variables

Every request should contain the full current game state supplied by the frontend.

The backend should simply transform the supplied state into a new state and return it.

---

## Controller responsibilities

The controller should only:

* receive requests
* validate input
* call the service
* return JSON responses

All game rules belong in the service.

---

## Router responsibilities

The router should expose only:

```
POST /start
POST /action
```

No game logic should exist inside the router.

---

## Objective

The Coffee Shop Simulator should become the reference implementation for all future backend mini-apps.

Every future app (games, calculators, simulators, visualizations, etc.) should be able to follow this exact architecture with only the service implementation changing.
I