const express = require('express');
const { apps } = require('../apps');

const router = express.Router();

router.get('/', (req, res) => {
  const appList = Object.values(apps).map((app) => ({
    name: app.name,
    metadata: app.metadata,
  }));

  res.json({ apps: appList });
});

router.use('/:appName', (req, res, next) => {
  const { appName } = req.params;
  const appEntry = apps[appName];

  if (!appEntry) {
    return res.status(404).json({ error: 'App not found.' });
  }

  req.appEntry = appEntry;
  next();
});

router.use('/:appName', (req, res, next) => {
  req.appEntry.router(req, res, next);
});

module.exports = router;
