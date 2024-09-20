require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { Client } = require('pg');
const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

module.exports = db;
