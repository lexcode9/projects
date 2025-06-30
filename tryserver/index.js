const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS (no need to install anything)
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// GET counter value
app.get('/counter', (req, res) => {
  const count = fs.readFileSync('counter.txt', 'utf8');
  res.json({ count: parseInt(count) });
});

// POST to update counter
app.post('/counter', (req, res) => {
  const { count } = req.body;
  fs.writeFileSync('counter.txt', count.toString());
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

