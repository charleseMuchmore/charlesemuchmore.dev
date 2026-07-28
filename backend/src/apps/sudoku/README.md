# Sudoku App

This folder contains the Sudoku interactive app.

Structure:
- `index.js` - exports the app router and metadata.
- `router.js` - Express router for app endpoints.
- `controller.js` - request handlers.
- `service.js` - app-specific business logic.
- `validation.js` - request validation middleware.

Routes:
- `GET /api/apps/sudoku/` - app information
- `POST /api/apps/sudoku/generate` - generate a sudoku puzzle
- `POST /api/apps/sudoku/solve` - solve a sudoku board
