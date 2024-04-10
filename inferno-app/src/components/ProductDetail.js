import { Component } from 'inferno';

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


  render() {
    const { products, images } = this.state;
    return (
      <div>
        {products.map(product => (
          <div key={product.sku} className="product-detail-container">
            <div className="product-details">
              {images[product.sku] && (
                images[product.sku].map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={product.name} 
                    className="product-detail-image"
                  />
                ))
              )}
            </div>
            <div className="product-info">
              <h2 className="product-detail-content">{product.name}</h2>
              <p className="product-detail-content">Beskrivning: {product.description}</p>
              <p className="product-detail-content">Pris: {product.price} {product.currency}</p>
              <button className="button">Lägg till i kundvagnen</button>
              <button className="button">Gå till kundvagn</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;