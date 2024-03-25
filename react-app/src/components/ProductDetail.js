import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { sku } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${sku}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [sku]);

  return (
    <div>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <div className="product-images">
            {product.image_downloads.map((image, index) => (
              <img
                key={index}
                src={require(`./mango/${image.replace(/['"\[\]]+/g, '')}.jpg`)}
                alt={`Bild ${index + 1}`}
                className="product-content"
              />
            ))}
          </div>
          <p className="product-content">Beskrivning: {product.description}</p>
          <p className="product-content">Pris: {product.price} {product.currency}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;