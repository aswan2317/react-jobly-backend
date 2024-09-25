const app = require ('./app')
const { PORT } = require("./config");
const { Client } = require('pg');
const cors = require('cors'); // Import CORS middleware
// const PORT = process.env.PORT || 3001;

// Apply CORS middleware
app.use(cors({
  origin: 'https://react-jobly-front-end-8sfo.onrender.com', }));
// Configure PostgreSQL client
const db = new Client({
  connectionString:process.env.DATABASE_URL || "postgresql://postgres.rrswhpcxyrttpujnfuis:[5wV_u$F5D8qbwpTe]@aws-0-us-west-1.pooler.supabase.com:6543/postgres",

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