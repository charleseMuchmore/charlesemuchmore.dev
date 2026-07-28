# Backend Mini-Apps Architecture

This directory contains self-contained interactive applications mounted under `/api/apps`.

## Purpose

Each app in `backend/src/apps/` is an isolated mini-application that exposes its own Express router and app-specific logic. These apps are intended to power website tools like games, calculators, or visualizations.

## Folder structure

Recommended structure for each app:

- `index.js` - exports the app router and metadata
- `router.js` - defines routes for the app, generic
- `controller.js` - request handlers, generic
- `service.js` - app-specific business logic
- `validation.js` - request validation middleware
- `model.js` - data model or helper utilities (optional)
- `middleware.js` - app-specific middleware (optional)
- `README.md` - app-specific documentation (optional)

## App discovery

The main route loader in `backend/src/routes/apps.js` imports `backend/src/apps/index.js` and mounts each app under `/api/apps/:appName`.

## Example

The `sudoku` app is a starter example:

- `GET /api/apps/sudoku/` - returns app metadata
- `POST /api/apps/sudoku/generate` - generates a Sudoku puzzle
- `POST /api/apps/sudoku/solve` - solves a Sudoku board

## Best practices

- Keep app logic self-contained
- Share only generic middleware and services from `backend/src/middleware/` and `backend/src/services/`
- Avoid cross-app dependencies
- Keep route names stable so frontend can discover apps reliably


I actually really like the idea of each app just having a "start" and an "action" endpoint. And then in the payload for the "action", is the actual app-specific request.
