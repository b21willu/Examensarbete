import { Component } from 'inferno';
import { Link } from 'inferno-router';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      images: {}, // Förvara bilder i state
      filterTerm: '',
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const apiUrl = 'http://localhost:3001/api/products';
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Skapa ett tomt objekt för att lagra bilder för varje produkt
      const images = {};
  
      // Gå igenom varje produkt för att samla in bilder
      await Promise.all(data.map(async product => {
        if (product.image_downloads && typeof product.image_downloads === 'string') {
          // Rengör strängen för att ta bort [ ] och ''
          const cleanedImageDownloads = product.image_downloads.replace(/[[\]']/g, '');
  
          // Dela upp strängen och hämta alla bilder
          const imagesList = cleanedImageDownloads.split(',');
          const imagePromises = imagesList.map(async imageName => {
            // Dynamiskt importera bilderna
            try {
              const { default: image } = await import(`../../../mango/${imageName}.jpg`);
              return image;
            } catch (error) {
              return null;
            }
          });
  
          // Vänta på alla bilder att hämtas och spara dem i state
          images[product.sku] = await Promise.all(imagePromises);
        }
      }));
  
      // Uppdatera state med bilder för varje produkt
      this.setState({ products: data, images });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleFilterChange = (event) => {
    const term = event.target.value;
    this.setState({ filterTerm: term });
  };

  filterProducts = (product) => {
    const { filterTerm } = this.state;
    if (!filterTerm) return true; // Om ingen kategori är vald returnera true, för att visa alla produkter
    return product.terms.includes(filterTerm);
  };

  render() {
    const { products, images } = this.state;

    return (
    <div>
        <div className='filter-container'>
          <label htmlFor="filter" className="filter-label">Filter:</label>
          <select id="filter" onChange={this.handleFilterChange} className="filter-select">
            <option value="">All</option>
            <option value="backpack">Backpack</option>
            <option value="bags">Bags</option>
            <option value="cardigans">Cardigans</option>
            <option value="cargo">Cargo</option>
            <option value="dresses">Dresses</option>
            <option value="hoodies">Hoodies</option>
            <option value="jackets">Jackets</option>
            <option value="jeans">Jeans</option>
            <option value="knitwear">Knitwear</option>
            <option value="linen">Linen</option>
            <option value="pants">Pants</option>
            <option value="puffers">Puffers</option>
            <option value="shoes">Shoes</option>
            <option value="shorts">Shorts</option>
            <option value="skirts">Skirts</option>
            <option value="suits">Suits</option>
            <option value="sweaters">Sweaters</option>
            <option value="t-shirts">T-shirts</option>
            <option value="tops">Tops</option>
          </select>
        </div>
        <div className="product-list">
          {products.filter(this.filterProducts).map(product => (
            <div key={product.sku} className="product">
              {images[product.sku] && (
                <Link to={`/product/${product.sku}`}>
                  <img
                    src={images[product.sku][0]}
                    alt={product.name} 
                    className="product-content"
                    id="product-image"
                  />
                </Link>
              )}
              <p className="product-content">{product.name}</p>
              <p className="product-content">Pris: {product.price} {product.currency}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;