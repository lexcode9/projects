const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Allow JSON body parsing
app.use(express.json());

// CORS headers (required for frontend access)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200); // CORS preflight
  next();
});

// Route: Get current counter value
app.get('/counter', (req, res) => {
  try {
    const count = fs.readFileSync('counter.txt', 'utf8');
    res.json({ count: parseInt(count, 10) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read counter' });
  }
});

// Route: Update counter value
app.post('/counter', (req, res) => {
  const { count } = req.body;
  if (typeof count !== 'number') {
    return res.status(400).json({ error: 'Count must be a number' });
  }

  try {
    fs.writeFileSync('counter.txt', count.toString());
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write counter' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
