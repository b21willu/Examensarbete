import { Component } from 'inferno';
import { Link } from 'inferno-router';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: {}
    };
  }

  componentDidMount() {
    const { sku } = this.props.match.params;
    this.fetchProducts(sku);
  }

  fetchProducts = async (sku) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${sku}`);
      const product = await response.json();
  
      // Skapa ett tomt objekt för att lagra bilder för den enskilda produkten
      const images = {};
  
      // Bearbeta bilderna
      if (product.image_downloads && Array.isArray(product.image_downloads)) {
        const imagePromises = product.image_downloads.map(async image => {
          // Rengör varje bild och ta bort onödiga tecken
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
  
        // Vänta på att alla bilder ska laddas och sparas i state
        images[product.sku] = await Promise.all(imagePromises);
      }
  
      // Uppdatera state med bilder för den enskilda produkten
      this.setState({ products: [product], images });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  addToCart = (product, sku) => {
    // Lägg till produkt i kundvagnen genom att uppdatera den globala variabeln
    window.cart = [...(window.cart || []), { ...product, sku }];
    alert('Produkten har lagts till i kundvagnen.');
  };


  render() {
    const { products, images } = this.state;
    const { sku } = this.props.match.params;

    return (
      <div>
        {products.map((product) => (
          <div key={product.sku} className="product-detail-container">
            <div className="product-details">
              {images[product.sku] &&
                images[product.sku].map((imageUrl, index) => (
                  <img key={index} src={imageUrl} alt={product.name} className="product-detail-image" />
                ))}
            </div>
            <div className="product-info">
              <h2 className="product-detail-content">{product.name}</h2>
              <p className="product-detail-content">Beskrivning: {product.description}</p>
              <p className="product-detail-content">Pris: {product.price} {product.currency}</p>
              <button className="button" onClick={() => this.addToCart(product, sku)}>
                Lägg till i kundvagnen
              </button>
              <Link to={`/kundvagn`} className="button">
                Gå till kundvagnen
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;