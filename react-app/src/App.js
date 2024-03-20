import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div>
      <Header/>
      <Navigation/>
      <ProductList/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
