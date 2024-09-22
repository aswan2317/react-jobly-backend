require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { Client } = require('pg');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 3001;

// Apply CORS middleware
app.use(cors({
  origin: 'https://react-jobly-front-end-8sfo.onrender.com', // Replace with your frontend URL
}));

// Configure PostgreSQL client
const db = new Client({
  connectionString: process.env.DATABASE_URL || "postgresql://localhost/jobly"
});

// Connect to the database
db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Error connecting to the database", err));

// Example route
app.get('/', (req, res) => {
  res.send("Hello, Jobly!");
});

// Another route for your /jobs endpoint (for example)
app.get('/jobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs'); // Example query
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = db;
