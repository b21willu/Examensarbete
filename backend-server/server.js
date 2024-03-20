const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Skapa anslutning till databasen
const pool = mysql.createPool({
  host: 'mysql57.unoeuro.com',
  port: 3306,
  user: 'examsensarbete_react_se',
  password: 'tw6fnc2FRdhHAyE5xGDa',
  database: 'examsensarbete_react_se_db',
  connectionLimit: 10
});

// Route för att hämta produkter
app.get('/api/products', async (req, res) => {
  try {
    // Hämta produkter från databasen
    const [rows, fields] = await pool.query('SELECT * FROM store_mango');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
