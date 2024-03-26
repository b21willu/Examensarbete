import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

  const handleAddToCart = () => {
    alert('Produkten har lagts till i kundvagnen.');
  };

  return (
    <div>
      {product && (
        <div className="product-detail-container">
          <div className="product-details">
            {product.image_downloads.map((image, index) => (
              <img
                key={index}
                src={require(`./mango/${image.replace(/['"\[\]]+/g, '')}.jpg`)}
                alt={`Bild ${index + 1}`}
                className="product-detail-image"
              />
            ))}
          </div>
          <div className="product-info">
            <h2 className="product-detail-content">{product.name}</h2>
            <p className="product-detail-content">Beskrivning: {product.description}</p>
            <p className="product-detail-content">Pris: {product.price} {product.currency}</p>
            <button onClick={handleAddToCart} className="button">Lägg till i kundvagnen</button>
            <Link to={`/kundvagn/${sku}`} className="button">Gå till kundvagnen</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;