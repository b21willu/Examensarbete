import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10); // Default limit is 10

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => {
        // Loop through the products and clean up the image_downloads field
        const cleanedProducts = data.map(product => {
          return {
            ...product,
            // Remove [ and ' from image_downloads
            image_downloads: product.image_downloads.replace(/[\[\]']/g, '').split(', ')
          };
        });
        setProducts(cleanedProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [limit]);

  return (
    <div>
      <h1>Produkter</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.sku} className="product">
            <Link to={`/product/${product.sku}`}>
              <img
                src={require(`../../../mango/${product.image_downloads[0]}.jpg`)}
                alt={product.name}
                className="product-content"
                id="product-image"
              />
            </Link>
            <p className="product-content">{product.name}</p>
            <p className="product-content">Pris: {product.price} {product.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;