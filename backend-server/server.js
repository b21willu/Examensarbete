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
    const limit = req.query.limit || 10; // Default limit is 10 if not specified
    const [rows, fields] = await pool.query(`SELECT * FROM store_mango LIMIT ${limit}`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:sku', async (req, res) => {
  try {
    const sku = req.params.sku;

    // Hämta produkten från databasen baserat på SKU
    const [productRows, productFields] = await pool.query(`SELECT * FROM store_mango WHERE sku = ?`, [sku]);
    const product = productRows[0];

    if (!product) {
      return res.status(404).json({ error: 'Produkt hittades inte' });
    }

    // Hämta bilderna för den specifika produkten från databasen
    const [imageRows, imageFields] = await pool.query(`SELECT image_downloads FROM store_mango WHERE sku = ?`, [sku]);
    const images = imageRows[0].image_downloads.split(',').map(filename => filename.trim());

    // Lägg till bilderna till produktobjektet
    product.image_downloads = images;

    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Starta servern
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
