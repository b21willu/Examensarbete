import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ShoppingCart = () => {
  const { sku } = useParams();
  const [productsInCart, setProductsInCart] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (sku) {
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
    }
  }, [sku]);


  useEffect(() => {
    if (product) {
      setProductsInCart(prevProducts => {
        // Kontrollera om produkten redan finns
        const productExists = prevProducts.some(p => p.sku === product.sku);
        if (!productExists) {
          // Lägg till produkten om den inte redan finns i kundvagnen
          return [...prevProducts, product];
        }
        return prevProducts;
      });
    }
  }, [product]);

  // Funktion för att ta bort en produkt
  const removeFromCart = (skuToRemove) => {
    setProductsInCart(prevProducts => prevProducts.filter(product => product.sku !== skuToRemove));
  };

  // Funktion för att beräkna det totala priset
  const calculateTotalPrice = () => {
    return productsInCart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div>
      {productsInCart.map(product => (
        <div key={product.sku} className="shopping-cart-container">
          <div className="shopping-cart">
            <img
              src={require(`../../../mango/${product.image_downloads[0].replace(/['"\[\]]+/g, '')}.jpg`)}
              alt={`Bild`}
              className="cart-image"
            />
          </div>
          <div className="shopping-product-info">
            <p className="shopping-detail-content">{product.name}</p>
            <p className="shopping-detail-content">Pris: {product.price} {product.currency}</p>
            <button onClick={() => removeFromCart(product.sku)}>Ta bort</button>
          </div>
        </div>
      ))}
      <div className="total-price">
        <p>Totalt pris: {calculateTotalPrice()} {productsInCart.length > 0 ? productsInCart[0].currency : ''}</p>
        <button className="pay-button">Betala</button>
      </div>
    </div>
  );
};

export default ShoppingCart;