import { Component } from 'inferno';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {}
    };
  }

  componentDidMount() {
    this.fetchProductImages();
  }

  // Funktion för att hämta bilder för produkterna i kundvagnen
  fetchProductImages = async () => {
    const { cart } = window;
    const images = {};

    // Loopa igenom produkterna i kundvagnen
    for (const product of cart) {
      if (product.image_downloads && Array.isArray(product.image_downloads)) {
        const imagePromises = product.image_downloads.map(async image => {
          const cleanedImage = image.replace(/['"[\]]+/g, '');
          try {
            // Dynamiskt importera bilderna
            const { default: img } = await import(`../../../mango/${cleanedImage}.jpg`);
            return img;
          } catch (error) {
            console.error('Error loading image:', error);
            return null;
          }
        });

        images[product.sku] = await Promise.all(imagePromises);
      }
    }

    this.setState({ images });
  };

  removeFromCart = (skuToRemove) => {
    // Uppdatera den globala kundvagnen för att ta bort produkten med den angivna SKU:en
    window.cart = window.cart.filter(product => product.sku !== skuToRemove);
    this.forceUpdate();
  };

  calculateTotalPrice = () => {
    return window.cart.reduce((total, product) => total + parseFloat(product.price), 0);
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        {window.cart.map(product => (
          <div key={product.sku} className="shopping-cart-container">
            <div className="shopping-cart">
              {images[product.sku] && (
                <img
                  src={images[product.sku][0]}
                  alt={`Bild 1`}
                  className="cart-image"
                />
              )}
            </div>
            <div className="shopping-product-info">
              <p className="shopping-detail-content">{product.name}</p>
              <p className="shopping-detail-content">Pris: {product.price} {product.currency}</p>
              <button onClick={() => this.removeFromCart(product.sku)}>Ta bort</button>
            </div>
          </div>
        ))}
        <div className="total-price">
          <p>Totalt pris: {this.calculateTotalPrice()} {window.cart.length > 0 ? window.cart[0].currency : ''}</p>
          <button className="pay-button">Betala</button>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;