import React, { useState, useEffect } from 'react';

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
            image_downloads: product.image_downloads.replace(/[\[\]']/g, '').split(', ') // Split the string by comma to get an array of image IDs
          };
        });
        setProducts(cleanedProducts);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [limit]);

  // Function to handle image load error
  const handleImageError = () => {
    console.error('Error loading image');
    // You can set a state here to display a placeholder image or show an alternative message
  };

  return (
    <div>
      <h1>Produkter</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.sku} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Pris: {product.price} {product.currency}</p>
            <img
              src={require(`./mango/${product.image_downloads[0]}.jpg`)}
              alt={product.name}
              className="product-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;