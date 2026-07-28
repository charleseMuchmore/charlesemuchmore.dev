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

// Mount each app's router at a fixed path
for (const [name, appEntry] of Object.entries(apps)) {
  router.use(`/${name}`, appEntry.router);
}

module.exports = router;
