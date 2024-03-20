import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10); // Default limit is 10

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [limit]);

  return (
    <div>
      <h1>Produkter</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.sku} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Pris: {product.price} {product.currency}</p>
            <img src={product.images} alt={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
