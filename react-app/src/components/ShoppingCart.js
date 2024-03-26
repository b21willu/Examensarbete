import React from 'react';
import { useCart } from '../CartContext';

const ShoppingCart = () => {
  const { removeFromCart, cart } = useCart();

// Funktion för att beräkna det totala priset
const calculateTotalPrice = () => {
  return cart.reduce((total, product) => total + parseFloat(product.price), 0);
};

  return (
    <div>
      {cart.map(product => (
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
        <p>Totalt pris: {calculateTotalPrice()} {cart.length > 0 ? cart[0].currency : ''}</p>
        <button className="pay-button">Betala</button>
      </div>
    </div>
  );
};

export default ShoppingCart;