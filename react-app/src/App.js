import Header from './components/Header';
import Navigation from './components/Navigation';
import ProductList from './components/ProductList';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
    <Router>
      <div>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/produkter" element={<ProductList />} />
          <Route path="/om-oss" element={<MainContent />} />
          <Route path="/kontakt" element={<MainContent />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
