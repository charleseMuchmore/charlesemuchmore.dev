const express = require('express');
const cors = require('cors'):
const port = 3001;
const domain = "https://charlesemuchmore.dev";

const app = express();
app.use(cors({
  origin: domain
}));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
